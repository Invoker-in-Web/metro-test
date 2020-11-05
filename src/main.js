import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import createPersistedState from "vuex-persistedstate";

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    budgetRecords: [
      {
        value: 1000,
        description: "заработок 1",
        id: uuidv4(),
      },
      {
        value: -300,
        description: "расход 1",
        id: uuidv4(),
      },
      {
        value: 500,
        description: "заработок 2",
        id: uuidv4(),
      },
      {
        value: 1000,
        description: "заработок 3",
        id: uuidv4(),
      },
      {
        value: -300,
        description: "расход 2",
        id: uuidv4(),
      },
      {
        value: 500,
        description: "заработок 4",
        id: uuidv4(),
      },
      {
        value: -1000,
        description: "расход 3",
        id: uuidv4(),
      },
      {
        value: -300,
        description: "расход 4",
        id: uuidv4(),
      },
      {
        value: 500,
        description: "заработок 5",
        id: uuidv4(),
      },
      {
        value: -500,
        description: "расход 5",
        id: uuidv4(),
      },
    ],

    newRecord: {
      value: null,
      description: '',
      id: uuidv4(),
      type: 'All'
    },

    separateNumbers(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
  },

  getters: {
    budgetRecords: s => s.budgetRecords,

    selectedType: s => s.selectedType,

    incomeRecords: s => s.budgetRecords.filter(record => record.value > 0),

    expenseRecords: s => s.budgetRecords.filter(record => record.value < 0),

    incomeValue: (state, getters) => {
      const incomeRecords = getters.incomeRecords.map(record => record.value)

      return incomeRecords.reduce((acc, cur) => acc + cur, 0)
    },

    expenseValue: (state, getters) => {
      const expenseRecords = getters.expenseRecords.map(record => record.value)

      return expenseRecords.reduce((acc, cur) => acc + cur, 0)
    },

    newRecord: s => s.newRecord
  },

  mutations: {
    updateDescription(state, payload) {
      state.newRecord.description = payload
    },

    updateValue(state, payload) {
      state.newRecord.value = +payload
    },

    changeBudget(state) {
      if (state.newRecord.type === 'All' || state.newRecord.type === '') {
        alert('Нужно изменить категорию на одну из: Income/Expense')
      }
      else {
        if (state.newRecord.value < 0) {
          alert('Сумма должна быть положительной!')
        } else {

          state.budgetRecords.push({
            id: uuidv4(),
            value: state.newRecord.type === 'Income' ? state.newRecord.value : -(state.newRecord.value),
            description: state.newRecord.description,
          })
          state.newRecord.value = null
          state.newRecord.description = ''
        }
      }

    },

    deleteRecord(state, payload) {
      state.budgetRecords
        .splice(state.budgetRecords
          .findIndex(record => record.id === payload), 1)
    }
  },

  actions: {
    changeBudget({ commit }) {
      commit('changeBudget')
    },

    updateDescription({ commit }, value) {
      commit('updateDescription', value)
    },

    updateValue({ commit }, value) {
      commit('updateValue', value)
    },

    deleteRecord({ commit }, id) {
      commit('deleteRecord', id)
    }
  },
  plugins: [createPersistedState()],
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

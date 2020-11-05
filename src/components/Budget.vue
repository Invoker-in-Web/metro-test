<template>
  <div class="budget">
    <div class="available_budget">
      <h4>Available Budget in November 2020:</h4>

      <h1>
        {{
          currentBalance > 0
            ? "+" + $store.state.separateNumbers(currentBalance)
            : $store.state.separateNumbers(currentBalance)
        }}
      </h1>

      <div
        class="income"
        :class="{
          hidden:
            $store.getters.newRecord.type !== 'Income' &&
            $store.getters.newRecord.type !== 'All',
        }"
      >
        <span>INCOME</span>
        <span class="income_value">{{
          $store.getters.incomeValue > 0
            ? "+" + $store.state.separateNumbers($store.getters.incomeValue)
            : 0
        }}</span>
      </div>

      <div
        class="expenses"
        :class="{
          hidden:
            $store.getters.newRecord.type !== 'Expense' &&
            $store.getters.newRecord.type !== 'All',
        }"
      >
        <span>EXPENSES</span>
        <span class="expense_value">{{
          $store.state.separateNumbers($store.getters.expenseValue)
        }}</span>

        <span
          v-show="
            $store.getters.incomeValue > 0 && $store.getters.expenseValue !== 0
          "
          class="expense_percent"
        >
          {{ Math.round(this.expensePercent) + "%" }}
        </span>
      </div>
    </div>

    <div class="record_budget">
      <select v-model="$store.state.newRecord.type">
        <option>Income</option>
        <option>Expense</option>
        <option>All</option>
      </select>

      <input
        type="text"
        placeholder="Add description"
        :value="$store.getters.newRecord.description"
        @input="updateDescription"
      />
      <input
        type="number"
        min="0"
        placeholder="Value"
        :value="$store.getters.newRecord.value"
        @input="updateValue"
      />

      <button @click="$store.dispatch('changeBudget')">&#10004;</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updateDescription(e) {
      this.$store.dispatch("updateDescription", e.target.value);
    },

    updateValue(e) {
      this.$store.dispatch("updateValue", e.target.value);
    },
  },

  computed: {
    currentBalance() {
      const moneysInBudget = this.$store.getters.budgetRecords.map(
        (i) => i.value
      );
      return moneysInBudget.reduce((acc, cur) => acc + cur, 0);
    },

    expensePercent() {
      return (
        (
          -this.$store.getters.expenseValue / this.$store.getters.incomeValue
        ).toFixed(2) * 100
      );
    },
  },
};
</script>

<style lang="scss">
.budget {
  width: 100%;
  background: no-repeat center/100% url("./../assets/bg_image.jpg");

  .available_budget {
    display: flex;
    flex-direction: column;
    align-items: center;

    .income,
    .expenses {
      width: 30%;
      margin: 0.5em 0;
      padding: 0.8em;
      color: black;
      display: flex;
      justify-content: space-between;
    }

    .income_value,
    .expense_value {
      color: white;
    }

    .income {
      background-color: lightseagreen;
      display: flex;
      justify-content: space-between;
    }

    .expenses {
      background-color: lightcoral;
      position: relative;

      .expense_percent {
        color: white;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 10px;
        background-color: rgb(199, 58, 3);
        padding: 0.1em 0.3em;
      }
    }
  }

  .record_budget {
    display: flex;
    justify-content: center;
    background-color: whitesmoke;
    margin-top: 5%;
    padding: 0.3em 0;
  }

  .record_budget > * {
    margin: 0.4em;
    padding: 0.5em;
    border: none;
  }

  .record_budget > *:focus {
    outline: solid lightcoral;
  }
}
</style>
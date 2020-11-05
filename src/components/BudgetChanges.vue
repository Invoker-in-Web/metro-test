<template>
  <div class="allRecords">
    <div
      class="income"
      :class="{
        hidden:
          $store.getters.newRecord.type !== 'Income' &&
          $store.getters.newRecord.type !== 'All',
      }"
    >
      <h3>INCOME</h3>

      <div
        v-show="$store.getters.incomeRecords"
        v-for="record in $store.getters.incomeRecords"
        :key="record.id"
        class="record_balance_item"
      >
        <div>{{ record.description }}</div>
        <div class="money_amount">{{ "+" + $store.state.separateNumbers(record.value) }}</div>
        <button
          @click="$store.dispatch('deleteRecord', record.id)"
          class="delete_record"
        >
          &times;
        </button>
      </div>
    </div>

    <div
      class="expenses"
      :class="{
        hidden:
          $store.getters.newRecord.type !== 'Expense' &&
          $store.getters.newRecord.type !== 'All',
      }"
    >
      <h3>EXPENSES</h3>

      <div
        v-for="record in $store.getters.expenseRecords"
        :key="record.id"
        class="record_balance_item"
      >
        <div>{{ record.description }}</div>
        <div class="money_amount">{{ $store.state.separateNumbers(record.value) }}</div>
        <button
          @click="$store.dispatch('deleteRecord', record.id)"
          class="delete_record"
        >
          &times;
        </button>
        <span
          class="expense_percent"
          v-show="
            $store.getters.incomeValue > 0 && $store.getters.expenseValue !== 0
          "
        >
          {{
            Math.round(
              (-record.value / $store.getters.incomeValue).toFixed(2) * 100
            ) + "%"
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.allRecords {
  color: black;
  display: flex;
  justify-content: space-around;
  width: 80%;

  .income,
  .expenses {
    width: 40%;

    h3 {
      border-bottom: 1px solid lightgray;
      margin-bottom: 0;
      padding-bottom: 0.8em;
    }
  }

  .income {
    h3,
    .money_amount {
      color: lightseagreen;
    }
  }

  .expenses {
    h3,
    .money_amount {
      color: lightcoral;
    }
  }

  .money_amount {
    margin-right: 1em;
  }

  .delete_record {
    position: absolute;
    top: 0;
    right: 0;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
  }

  .expense_percent {
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    font-size: 10px;
    width: 2em;
    text-align: right;
    padding: .1em .5em .1em .1em;
    background-color: rgb(199, 58, 3);
  }

  .record_balance_item {
    border-bottom: 1px solid lightgray;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .record_balance_item:nth-child(2n) {
    background-color: whitesmoke;
  }
}
</style>
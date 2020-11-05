<template>
  <div id="app">
    <Budget />
    <BudgetChanges />
  </div>
</template>

<script>
import Budget from "@/components/Budget";
import BudgetChanges from "@/components/BudgetChanges";

export default {
  name: "App",
  components: {
    Budget,
    BudgetChanges,
  },
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: white;

  .hidden {
    display: none;
  }
}
</style>
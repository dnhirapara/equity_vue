<template>
  <div id="app">
    <div class="container">
      <FilterTodos />
      <Equity />
      <Todos />
    </div>
  </div>
</template>

<script>
import Todos from "./components/Todos";
import FilterTodos from "./components/FilterTodos";
import Equity from "./components/Equity";

export default {
  name: "App",
  components: {
    Todos,
    FilterTodos,
    Equity,
  },
};
</script>

<style>
</style>

<template>
  <div class="container">
    <p>Filter Todos</p>
    <select @change="filterTodos($event)">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FilterTodos",
  methods: {
    ...mapActions(["filterTodos"]),
  },
};
</script>


<style scoped>
</style>
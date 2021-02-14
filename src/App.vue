<template>
  <div id="app">
    <Equity />
  </div>
</template>

<script>
import Equity from "./components/Equity";

export default {
  name: "App",
  components: {
    Equity,
  },
};
</script>

<style>
#app {
  height: 100vh;
  overflow-y: auto;
  background: #004f79;
}
</style>

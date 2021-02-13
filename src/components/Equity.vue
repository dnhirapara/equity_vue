<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <input type="text" v-on:keyup="searchDataBy" v-model="searchBy" />
        <div v-if="isLoading">
          <i class="fas fa-sync-alt fa-spin"></i>
        </div>
        <div v-else></div>
      </div>
      <div class="card-body">
        <div class="table-responsive equity-table" ref="equity-table">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>NAME</th>
                <th>OPEN</th>
                <th>HIGH</th>
                <th>LOW</th>
                <th>CLOSE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="val in allData" :key="val.id">
                <td>{{ val.name }}</td>
                <td>{{ val.open }}</td>
                <td>{{ val.high }}</td>
                <td>{{ val.low }}</td>
                <td>{{ val.close }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Equity",
  data() {
    return {
      searchBy: "",
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(["fetchData", "searchData", "loadMore"]),
    searchDataBy() {
      this.searchData(this.searchBy);
    },
  },
  computed: mapGetters(["allData"]),
  mounted() {
    var ele = document.querySelector(".equity-table");
    ele.addEventListener("scroll", () => {
      if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
        this.isLoading = true;
        this.loadMore();
        this.isLoading = false;
        console.log(ele.scrollHeight);
      }
    });
  },
  created() {
    console.log("called");
    this.isLoading = true;
    this.fetchData();
    this.isLoading = true;
  },
};
</script>

<style scoped>
.equity-table {
  max-height: 50vh;
  border: 2px solid green;
  border-radius: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
}
table thead {
  position: sticky;
  widows: 100%;
  top: 0;
  z-index: 2;
}
</style>
<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <input type="text" v-on:keyup="searchDataBy" v-model="searchBy" />
        <div class="float-right">
          <i class="fas fa-download" v-on:click="downloadDataBy"></i>
        </div>
        <div v-if="isLoading">
          <h1>{{ logs() }}</h1>
          <p>spning</p>
          <i class="fas fa-sync-alt fa-spin"></i>
        </div>
        <div v-else></div>
      </div>
      <div class="card-body">
        <div class="table-responsive equity-table" ref="equity-table">
          <table class="table table-bordered" id="equity-data">
            <thead class="thead-dark">
              <tr>
                <th>
                  NAME
                  <span class="float-right">
                    <i
                      class="fas fa-sort-amount-down-alt"
                      @click="sortData"
                    ></i>
                  </span>
                </th>
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
      url: "",
    };
  },

  methods: {
    ...mapActions([
      "fetchData",
      "searchData",
      "loadMore",
      "sortDataBy",
      "downloadCSV",
    ]),

    logs() {
      console.log("spningdldkjd");
    },

    searchDataBy() {
      this.searchData(this.searchBy);
    },

    sortData() {
      this.sortDataBy("name", true);
    },

    async downloadDataBy() {
      console.log(this.searchBy + " in main");
      this.url = await this.downloadCSV(this.searchBy);
      console.log(this.url);
    },
  },

  computed: mapGetters(["allData"]),

  mounted() {
    var ele = document.querySelector(".equity-table");
    ele.addEventListener("scroll", () => {
      if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
        this.isLoading = true;
        console.log(this.isLoading);
        for (var i = 0; i < 1100000; i++) {
          i = i + 0;
        }
        this.loadMore();
        this.isLoading = false;
        console.log(this.isLoading);
        console.log(ele.scrollHeight);
      }
    });
  },

  created() {
    console.log("called");
    this.isLoading = true;
    this.loadMore();
    this.isLoading = true;
  },
};
</script>

<style scoped>
.equity-table {
  max-height: 100vh;
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
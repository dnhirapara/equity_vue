<template>
  <div class="container">
    <v-app>
      <v-text-field
        v-model="searchBy"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="allData"
        :custom-filter="toRupees"
        :items-per-page="5"
        :loading="isLoading"
        :search="searchBy"
        class="elevation-1"
      ></v-data-table>
    </v-app>
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
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Open", value: "open" },
        { text: "High", value: "high" },
        { text: "Low", value: "low" },
        { text: "Close", value: "close" },
      ],
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

    toggleLoding() {
      console.log(this.isLoading);
      this.isLoading = !this.isLoading;
    },

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
    ele.addEventListener("scroll", async () => {
      if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
        this.isLoading = true;
        console.log(this.isLoading);
        for (var i = 0; i < 1100000; i++) {
          i = i + 0;
        }
        await this.loadMore();
        this.isLoading = false;
        console.log(this.isLoading);
        console.log(ele.scrollHeight);
      }
    });
  },

  async created() {
    console.log("called");
    this.isLoading = true;
    await this.loadMore();
    this.isLoading = false;
  },

  filters: {
    toRupees: (open) => {
      if (typeof open !== "number") {
        return open;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(open);
    },
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
<template>
  <div class="container">
    <div
      class="alert mt-1"
      v-bind:class="'alert-' + alertType"
      role="alert"
      v-if="isAlert"
    >
      <i
        class="fa fa-close fa-2x float-right lign-self-center d-flex"
        v-on:click="closeAlert"
      ></i>
      <div v-html="alertMsg" class="d-flex"></div>
    </div>
    <div class="card mt-1 mb-1">
      <div class="card-header">
        <div class="row">
          <div class="col mb-1">
            <div class="input-group col">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-search"></i
                ></span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Enter search key..."
                v-model="searchBy"
                v-on:keyup="searchDataBy"
              />
              <!-- input-group -->
            </div>
            <!-- col -->
          </div>
          <div class="col-md-2 align-self-center d-flex justify-content-center mb-1">
            <button
              class="btn btn-success mr-1 generateBtn"
              v-if="!isFileAvailable"
              v-on:click="generateCSV"
            >
              Generate CSV <i class="fa fas-spinner" v-if="filePreparing"></i>
            </button>
            <a
              :href="url"
              class="btn downloadBtn mx-auto downloadBtn"
              v-bind:class="isFileAvailable ? '' : 'disabled'"
              v-on:click="downloadFile"
              :disabled="!isFileAvailable"
              v-if="isFileAvailable"
            >
              <i class="fas fa-file-download"> Download</i>
            </a>
            <!-- <i class="btn fas fa-download"></i> -->
            <!-- float-right -->
          </div>
          <!-- row -->
        </div>
        <!-- card-header -->
      </div>
      <div class="card-body m-0 p-0">
        <div class="spinner" ref="loading" v-if="loading">
          <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <table class="table table-bordered m-0" id="equity-table">
          <thead class="sticky-top">
            <th>
              Name
              <span class="float-right">
                <i
                  class="fas"
                  v-bind:class="[sort['name'] ? upClass : downClass]"
                  v-on:click="toggleSort('name')"
                ></i>
              </span>
            </th>
            <th>
              Open
              <span class="float-right">
                <i
                  class="fas"
                  v-bind:class="[sort['open'] ? upClass : downClass]"
                  v-on:click="toggleSort('open')"
                ></i>
              </span>
            </th>
            <th>
              High
              <span class="float-right">
                <i
                  class="fas"
                  v-bind:class="[sort['high'] ? upClass : downClass]"
                  v-on:click="toggleSort('high')"
                ></i>
              </span>
            </th>
            <th>
              Low
              <span class="float-right">
                <i
                  class="fas"
                  v-bind:class="[sort['low'] ? upClass : downClass]"
                  v-on:click="toggleSort('low')"
                ></i>
              </span>
            </th>
            <th>
              Close
              <span class="float-right">
                <i
                  class="fas"
                  v-bind:class="[sort['close'] ? upClass : downClass]"
                  v-on:click="toggleSort('close')"
                ></i>
              </span>
            </th>
            <!-- thead -->
          </thead>
          <tbody>
            <tr v-for="i in allData" :key="i.id">
              <td>
                {{ i.NAME }}
              </td>
              <td>{{ i.OPEN | currency }}</td>
              <td>{{ i.HIGH | currency }}</td>
              <td>{{ i.LOW | currency }}</td>
              <td>{{ i.CLOSE | currency }}</td>
            </tr>
            <!-- tbody -->
          </tbody>
          <!-- table -->
        </table>
        <!-- card-body -->
      </div>
      <div class="card-footer">
        <div class="row justify-content-between">
          <div class="col-md-5 text-center mb-1">
            <div class="text-dark">
              <button type="button" class="btn btn-dark" aria-disabled="true">
                <span class="text-light">Last Fetched On: </span>
                <span class="badge bg-info">{{ lastDate }}</span>
              </button>
              <!-- <div class="float-right">
                Total Entries:
                <span class="badge rounded-pill bg-primary">{{ totalEntry }}</span>
              </div> -->
            </div>
          </div>
          <div class="col-md-3 text-center mb-1">
            <button class="btn btn-success" v-on:click="loadAllData()"><span class="badge rounded-pill bg-dark">{{totalEntry}} of {{entireTotal}}</span> <span>Load All</span></button>
          </div>
        </div>
      </div>
      <!-- card -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DataTable",

  data() {
    return {
      isFileAvailable: false,
      upClass: "fa-sort-amount-up",
      downClass: "fa-sort-amount-down-alt",
      searchBy: "",
      loading: false,
      isAlert: true,
      alertMsg: `
      <pre>Enter search text to find data.<br/>Click on 'Generate CSV' to generate and download searched data in csv format.<br/>To download all data clear search field and then 'Generate CSV' file.<br/>Click On 'Load All' to fetch all data.</pre>`,
      url: "",
      alertType: "success",
      filePreparing: false,
      sort: {
        name: false,
        open: false,
        high: false,
        low: false,
        close: false,
      },
    };
  },

  methods: {
    ...mapActions([
      "fetchData",
      "loadMore",
      "searchData",
      "sortDataBy",
      "downloadCSV",
    ]),

    sleeps: async (time) => {
      return await new Promise(() =>
        setTimeout(() => {
          console.log(`Time after ${time}`);
        }, time)
      );
    },

    async searchDataBy() {
      this.loading = true;
      this.isFileAvailable = false;
      // console.log(this.searchBy);
      await this.searchData(this.searchBy);
      this.loading = false;
    },

    closeAlert() {
      this.isAlert = false;
    },

    async loadAllData(){
      this.loading = true;
      this.isFileAvailable = false;
      await this.fetchData(this.searchBy);
      this.loading = false;
    },

    async toggleSort(field) {
      this.loading = true;
      console.log(this.loading);
      this.sort[field] = !this.sort[field];
      console.log(this.sort[field]+" Hello"+this.loading);
      await this.sortDataBy({ field: field, reverse: this.sort[field] });
      console.log("Hi after sorting");
      this.loading = false;
    },

    async generateCSV() {
      this.loading = true;
      this.filePreparing = true;
      const data = await this.downloadCSV({ key: this.searchBy });
      this.url = data.url;
      if (data.error != null && data.error != undefined) {
        this.isAlert = true;
        this.alertType = "danger";
        this.alertMsg = "Data with this key is not available.";
        this.loading = false;
        return;
      }
      // console.log(this.url);
      if (this.url != "" && this.url != null && this.url != undefined) {
        this.isFileAvailable = true;
      }
      this.url = "http://" + this.url;
      this.filePreparing = false;
      this.loading = false;
    },

    downloadFile() {
      console.log("Download File");
    },
  },

  computed: mapGetters(["allData", "lastDate", "totalEntry","entireTotal"]),

  async created() {
    console.log("Application Loaded.");
    this.loading = true;
    await this.loadMore();
    this.loading = false;
  },

  mounted() {
    setTimeout(()=>{this.isAlert = false;}, 60000);
    var ele = document.querySelector(".card-body");
    if (ele != null) {
      ele.addEventListener("scroll", async () => {
        if (ele.scrollTop + ele.clientHeight + 1 >= ele.scrollHeight) {
          this.loading = true;
          await this.loadMore(this.searchBy);
          this.loading = false;
        }
      });
    }
  },

  filters: {
    currency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(value);
    },
  },
};
</script>
<style scoped>
.spinner {
  position: fixed;
  color: brown;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
}

table {
  border-collapse: separate;
}

td,
th{
  background: #caf0f8;
  color: black;
  border: 1px solid white;
  border-radius: 10px;
  text-align: center;
  vertical-align: middle;
}
.generateBtn {
  background: #023e8a;
  border-color: #023e8a;
}
.downloadBtn {
  background: #caf0f8;
  border-color: #0081a7;
}
th {
  background-color: #022249;
  color: white;
}
.card-body {
  max-height: 75vh;
  overflow-y: scroll;
}
.fa-spinner {
  color: #FF9045;
}
a{
  text-decoration: none;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: justify;
}
</style>

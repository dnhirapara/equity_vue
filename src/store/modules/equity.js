import axios from "axios";

axios.defaults.baseURL = "https://bhavcopy-1.herokuapp.com"
// axios.defaults.baseURL = "http://localhost:1337"
const state = {
    data: [],
    dataPerScroll: 100,
    limit: 0,
    date: '',
    total: 0,
    entire_total: 1,
};

const getters = {
    allData: (state) => state.data,
    lastDate: (state) => state.date,
    totalEntry: (state) => state.total,
};

const actions = {
    async sleep(time) {
        return await new Promise((resolve) => setTimeout(resolve, time));
    },
    async fetchData({ commit }) {
        const response = await axios.get('/api/');
        state.date = new Date(response.data.date).toLocaleString("en-US");
        state.total = response.data.total;
        commit('setData', response.data.data);
    },
    async loadMore({ commit }, searchBy) {
        if(total>=entire_total){
            return 0;
        }
        var _limit = parseInt(state.limit) + state.dataPerScroll;
        var response;
        if (searchBy == null || searchBy == undefined || searchBy == '') {
            response = await axios.get(`/api/?limit=${_limit}&offset=${state.limit}`);
        } else {
            response = await axios.get(`/api/?limit=${_limit}&offset=${state.limit}&search=${searchBy}`)
        }
        // console.log(response.data);
        state.date = new Date(response.data.date).toLocaleString("en-US");
        state.total = response.data.total;
        state.entire_total = response.data.entire_total;
        commit('loadData', response.data.data);
        // commit('loadData', response.data.data.slice(state.limit, state.limit + state.dataPerScroll));
        return 1;
    }
    ,
    async searchData({ commit }, key) {
        // console.log(key);
        state.limit = 0;
        var _limit = parseInt(state.limit) + state.dataPerScroll;
        if (key == "") {
            key = "*"
        }
        const response = await axios.get(`/api/?limit=${_limit}&offset=${state.limit}&search=${key}`);
        commit('setData', response.data.data);
    },
    async sortDataBy({ commit }, payload) {
        // console.log(payload.field);
        // console.log(payload.reverse);
        await commit('sortData', payload);
    },
    async downloadCSV({ commit }, payload) {
        // console.log(payload);
        var key = payload.key;
        if (key == "" || key == null || key == undefined) {
            key = "*"
        }
        // console.log(key);
        const response = await axios.get(`/api/getcsv/${key}`);
        // console.log(response.data);
        commit('dummy', response.data.url);
        return response.data;
    }
};

const mutations = {
    dummy: (state, url) => {
        console.log(url);
    },
    setData: (state, data) => {
        state.data = data,
        state.limit = state.data.length;
    },
    loadData: (state, data) => {
        state.data = state.data.concat(data);
        state.limit = state.data.length;
    },
    sortData: (state, payload) => {
        console.log("Sorting Data.........");
        var param = payload.field;
        var reverse = payload.reverse;
        // console.log(`Reverse${reverse}`);
        if (state.data.length == 0) {
            return;
        }
        // console.log(state.data[0]["name"]);
        if (isNaN(state.data[0][param])) {
            // console.log(reverse);
            // console.log(state.data[0][param] + " if " + param);
            if (reverse == true) {
                state.data = state.data.sort((lhs, rhs) => { return lhs[param] < rhs[param]; });
            } else {
                state.data = state.data.sort((lhs, rhs) => { return lhs[param] > rhs[param] })
            }
        } else {
            // console.log(state.data[0][param] + " else " + param);
            if (reverse == true) {
                state.data = state.data.sort((lhs, rhs) => { return parseFloat(lhs[param]) < parseFloat(rhs[param]); });
            } else {
                state.data = state.data.sort((lhs, rhs) => { return parseFloat(lhs[param]) > parseFloat(rhs[param]) })
            }
        }
        // console.log(state.data);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}

import axios from "axios";

const state = {
    data: [],
    limit: 0,
};

const getters = {
    allData: (state) => state.data,
    // allData: (state) => state.data.sort((a, b) => { return a.name > b.name }),
    // sortData: (state) => state.data.sort(),
};

const actions = {
    async sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    },
    async fetchData({ commit }) {
        const response = await axios.get('http://localhost:8000/api/?limit=30');
        commit('setData', response.data.data);
    },
    async loadMore({ commit }) {
        var _limit = parseInt(state.limit) + 10;
        const response = await axios.get(`http://localhost:8000/api/?limit=${_limit}`);
        commit('loadData', response.data.data.slice(state.limit, state.limit + 10));
    }
    ,
    async searchData({ commit }, key) {
        console.log(key);
        if (key == "") {
            key = "*"
        }
        const response = await axios.get(`http://localhost:8000/api/?limit=105&search=${key}`);
        commit('setData', response.data.data);
    },
    async sortDataBy({ commit }, param, reverse = false) {
        console.log(state.data);
        commit('sortData', param, reverse);
    },
    async downloadCSV({ commit }, key) {
        console.log(key);
        if (key == "" || key == null || key == undefined) {
            return;
        }
        console.log(key);
        const response = await axios.get(`http://localhost:8000/api/getcsv/${key}`);
        commit('dummy', response.data['url']);
        return response.data["url"];
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
    sortData: (state, param, reverse) => {
        if (state.data.length == 0) {
            return;
        }
        console.log(state.data[0]["name"]);
        if (isNaN(state.data[0][param])) {
            if (reverse == true) {
                state.data = state.data.sort((lhs, rhs) => { return lhs[param] < rhs[param]; });
            } else {
                state.data = state.data.sort((lhs, rhs) => { return lhs[param] > rhs[param] })
            }
        } else {
            if (reverse == true) {
                state.data = state.data.sort((lhs, rhs) => { return parseFloat(lhs[param]) < parseFloat(rhs[param]); });
            } else {
                state.data = state.data.sort((lhs, rhs) => { return parseFloat(lhs[param]) > parseFloat(rhs[param]) })
            }
        }
        console.log(state.data);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
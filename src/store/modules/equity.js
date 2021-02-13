import axios from "axios";

const state = {
    data: [],
    limit: 0,
};

const getters = {
    allData: (state) => state.data.sort(function (a, b) { return a.name > b.name }),
    sortData: (state) => state.data.sort(),
};

const actions = {
    async sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    },
    async fetchData({ commit }) {
        const response = await axios.get('http://localhost:8000/api/?limit=3000');
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
    async sortDataBy({ commit }, param) {
        commit('sortData', param);
    }
};

const mutations = {
    setData: (state, data) => {
        state.data = data,
            state.limit = state.data.length;
    },
    loadData: (state, data) => {
        state.data = state.data.concat(data);
        state.limit = state.data.length;
    },
    sortData: (state, param) => {
        console.log(state.data.data[0]["name"]);
        state.data = state.data.sort((a, b) => { return a[param] < b[param]; });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
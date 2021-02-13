import axios from "axios";

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos,
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        console.log(response.data);
        commit('setTodos', response.data);
    },
    async filterTodos({ commit }, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        console.log(typeof response.data);
        commit('setTodos', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
};

export default {
    state,
    getters,
    actions,
    mutations
}
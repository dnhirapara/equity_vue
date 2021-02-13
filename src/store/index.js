import Vuex from 'vuex';
import Vue from 'vue';
import equity from './modules/equity.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        equity
    }
});
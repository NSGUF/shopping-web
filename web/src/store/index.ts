import Vue from "vue";
import Vuex, { Store } from "vuex";
import user from './modules/user';
import car from './modules/car';
import { createLogger } from "vuex";

Vue.use(Vuex);

const store = new Store({
  modules: {
    user,
    car
  },
  plugins: [createLogger()]
});
export default store;

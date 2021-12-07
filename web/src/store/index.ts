import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";
import { MUTATIONS_KEYS } from "../const/vuex";

Vue.use(Vuex);

const state = {
  userInfo: {
    isLogin: false,
    username: ''
  },
};

type TypeState = typeof state;
type TypeUserInfo = typeof state.userInfo;


const options: StoreOptions<TypeState> = {
  state,
  mutations: {
    [MUTATIONS_KEYS.updateUserInfo](state: TypeState, userInfo: TypeUserInfo) {
      state.userInfo = userInfo;
    },
  },
  getters: {
    isLogin: (state: TypeState): boolean => state.userInfo.isLogin,
    username: (state: TypeState): string => state.userInfo.username,
  }
};
const store = new Store(options);
export default store;

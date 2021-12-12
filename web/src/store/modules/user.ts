import { MUTATIONS_KEYS } from "../../const/vuex";

const state = {
  userInfo: {
    phone: '',
    isAdmin: false,
  },
};

type TypeState = typeof state;
type TypeUserInfo = typeof state.userInfo;

const getters = {
  phone: (state: TypeState): string => state.userInfo.phone,
  isAdmin: (state: TypeState): boolean => state.userInfo.isAdmin,
}

const actions = {

}
const mutations = {
  [MUTATIONS_KEYS.updateUserInfo](state: TypeState, userInfo: TypeUserInfo) {
    state.userInfo = userInfo;
  },
  [MUTATIONS_KEYS.logout](state: TypeState) {
    localStorage.clear();
    state.userInfo = {
      phone: '',
      isAdmin: false,
    };
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

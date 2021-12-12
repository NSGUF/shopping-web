
const state = {
  items: [],
  checkoutStatus: null
};

type TypeState = typeof state;

const getters = {
  getAllCount: (state: TypeState): number => state.items.length,
}

const actions = {

}
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

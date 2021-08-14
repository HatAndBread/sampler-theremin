import { createStore } from 'vuex';

export default createStore({
  state: {
    toneStarted: false,
  },
  mutations: {
    setToneStarted(state) {
      state.toneStarted = true;
    },
  },
  actions: {
  },
  modules: {
  },
});

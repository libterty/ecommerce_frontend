import Vue from 'vue'
import Vuex from 'vuex'
import Request from '../api/index';
const request = new Request();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      address: '',
      tel: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser 
      }
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('credit')
    }
  },
  actions: {
    async getCurrentUser() {
      try {
        const res = await request.getCurrentUser();
        if (res.status !== 'success') {
          throw new Error('Unauthenticed');
        }
        this.commit('setCurrentUser', {
          id: res.id,
          name: res.name,
          email: res.email,
          address: res.address,
          tel: res.tel,
          isAdmin: res.isAdmin
        });
        return true;
      } catch (error) {
        this.commit('revokeAuthentication');
        return false;
      }
    }
  }
})

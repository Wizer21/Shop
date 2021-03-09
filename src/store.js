import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.sessionStorage
})

const store = createStore({
    state () {
      return {
        logged: false,
        user_id: 0,
        isAdmin: false
      }
    },
    mutations: {
      login (state, payload) {
        state.logged = true
        state.user_id = payload.user_id
        state.isAdmin = payload.admin
      }
    },    
    plugins: [vuexPersist.plugin],
  })
export default store

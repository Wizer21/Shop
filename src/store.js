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
        user_id: -1,
        isAdmin: false
      }
    },
    mutations: {
      login (state, payload) {
        state.logged = true
        state.user_id = payload.user_id
        state.isAdmin = payload.admin
      },
      logout(state) {       
        state.logged = false
        state.user_id = -1
        state.isAdmin = false
      }
    },    
    plugins: [vuexPersist.plugin],
  })
export default store

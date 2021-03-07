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
      }
    },
    mutations: {
      login (state, payload) {
        state.logged = true
        state.user_id = payload.user_id
      }
    },    
    plugins: [vuexPersist.plugin],
  })
export default store

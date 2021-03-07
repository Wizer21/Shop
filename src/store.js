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
        this.logged = true
        this.user_id = payload.user_id
        console.log(this.state)
      }
    },    
    plugins: [vuexPersist.plugin],
  })
export default store

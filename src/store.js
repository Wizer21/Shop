import { createStore } from 'vuex'
const db = require('./lowdb/lowdb.js')
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
        item_list: db.getObjectList()
      }
    },
    mutations: {
      login (payload) {
        this.logged = true
        console.log("LOGIN MUTATION")
        console.log(this.logged)
        this.user_id = payload.id
      }
    },    
    plugins: [vuexPersist.plugin],
  })

export default store
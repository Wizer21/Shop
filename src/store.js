import { createStore } from 'vuex'
const db = require('./lowdb/lowdb.js')

const store = createStore({
    state () {
      return {
        logged: false,
        count: 156,
        item_list: db.getObjectList()
      }
    },
    mutations: {
      login () {
        this.logged = true
        console.log("LOGIN MUTATION")
        console.log(this.logged)
      }
    }
  })

export default store
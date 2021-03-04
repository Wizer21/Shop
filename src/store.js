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
      increment (state) {
        state.count++
      }
    }
  })

export default store
import {createApp, h} from 'vue'
import { createStore } from 'vuex'

import Index from './pages/Index.vue'
import Main from './pages/Main.vue'
import Error from './pages/Error.vue'

const db = require('./lowdb/lowdb.js')

// Create Routes
const routes = {
  '/': Index,
  '/main': Main
}

// Create Store
const store = createStore({
    state () {
      return {
        count: 156,
        object: db.getObjectList()
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })

// Create Router
const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),
  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || Error
    },
  },

  render() {
    return h(this.CurrentComponent)
  }
}

// Create APP 
createApp(SimpleRouter).use(store).mount('#app')  
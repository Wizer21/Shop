import {createApp, h} from 'vue'
import { createStore } from 'vuex'

import Index from './pages/Index.vue'
import Main from './pages/Main.vue'
import Error from './pages/Error.vue'

// import db from './lowdb/'

// Create Routes
const routes = {
  '/': Index,
  '/main': Main
}

// Create Store
const store = createStore({
    state () {
      return {
        count: 0
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })

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
const app = createApp(SimpleRouter).mount('#app')  
// Bind store to the app
app.use(store)
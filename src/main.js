import {createApp, h} from 'vue'

import Index from './pages/Index.vue'
import Main from './pages/Main.vue'
import Shop from './pages/Shop.vue'
import Error from './pages/Error.vue'

// Import Store
import store from './store.js'

// Create Routes
const routes = {
  '/': Index,
  '/main': Main,
  '/shop': Shop
}

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
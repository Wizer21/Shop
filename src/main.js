import {createApp, h} from 'vue'
import Index from './pages/Index.vue'
import Main from './pages/Main.vue'
import Error from './pages/Error.vue'

const routes = {
  '/': Index,
  '/main': Main
}

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || Error
    }
  },

  render() {
    return h(this.CurrentComponent)
  }
}

createApp(SimpleRouter).mount('#app')
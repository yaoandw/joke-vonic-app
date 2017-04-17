import Vue from 'vue'
import Vonic from 'vonic'
import AV from 'leancloud-storage/dist/node/index.js'

var APP_ID = 'eq5tge5ziB5wPQdu1WJyy3O2';
var APP_KEY = 'EjyBMtW8AJatUGpw6mKaszPR';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'

// Routes
const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About }
]

Vue.use(Vonic.app, {
  routes: routes
})

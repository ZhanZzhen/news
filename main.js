import Vue from 'vue'
import App from './App'
import store from './store'

import {myRequest} from 'common/api/index.js'
Vue.prototype.$myRequest = myRequest
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

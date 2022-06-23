import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

// Front End Components
import Header from '@/components/Header'
import FooterL from '@/components/FooterL'
import Footer from '@/components/Footer'

// import Payment from '@/components/Payment'

// Admin Components
import Login from '@/components/Login'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBell, faSearch, faChevronLeft, faChevronRight,
  faBars, faPhone, faMapMarkerAlt, faLocationArrow,
  faUser, faUsers, faBuilding, faPlus, faCalendar,
  faClock, faTimes, faSpinner, faTrashAlt, faLock,
  faLockOpen, faKey, faSignal, faSignInAlt, faPlug,
  faCogs, faProjectDiagram, faChartBar, faUnlockAlt,
  faGift, faGlobe
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLazyload from 'vue-lazyload'

import AOS from 'aos'
import 'aos/dist/aos.css'



import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(VueLazyload)

library.add(faSearch, faBell, faChevronLeft, faChevronRight,
  faBars, faPhone, faMapMarkerAlt, faLocationArrow,
  faUser, faUsers, faBuilding, faPlus, faCalendar,
  faClock, faTimes, faSpinner, faTrashAlt, faKey,
  faLock, faLockOpen, faSignal, faSignInAlt, faPlug,
  faCogs, faProjectDiagram, faChartBar, faUnlockAlt,
  faGift, faGlobe)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('Header', Header)
Vue.component('FooterL', FooterL)
Vue.component('Footer', Footer)
// Vue.component('Payment', Payment)

/* eslint-disable no-new */
new Vue({
  created() {
    AOS.init()
  },
  el: '#app',
  router,
  render: h => h(App)
})

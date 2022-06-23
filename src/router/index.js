import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
const axios = require('axios');


function loadView(view) {
  return () => import(`@/components/${view}.vue`)
}

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: loadView('Home')
    },
    {
      path: '/Medical-Network',
      name: 'MedicalNet',
      component: loadView('MedicalNet'),
    },
    // {
    //   path: '/Payment',
    //   name: 'Payment',
    //   component: loadView('Payment'),
    // },
    {
      path: '/Medical-Network/Company/:id',
      name: 'Company',
      component: loadView('Company'),
    },
    {
      path: '/Medical-Network-Visitor',
      name: 'MedicalNetVisitor',
      component: loadView('visitors/MedicalNet'),
      blocked: true
    },
    {
      path: '/Medical-Network-Visitor/Company/:id',
      name: 'CompanyVisitor',
      component: loadView('visitors/Company'),
      blocked: true
    },
    {
      path: '/Offers',
      name: 'Offers',
      component: loadView('Offers')
    },
    {
      path: '/Offers/:id',
      name: 'Offer',
      component: loadView('Offer')
    },
    {
      path: '/News',
      name: 'News',
      component: loadView('News')
    },
    {
      path: '/News/:id',
      name: 'NewPage',
      component: loadView('NewPage')
    },
    {
      path: '/Events',
      name: 'Events',
      component: loadView('Events')
    },
    {
      path: '/Events/:id',
      name: 'EventPage',
      component: loadView('EventPage')
    },
    {
      path: '/Awards',
      name: 'Awards',
      component: loadView('Awards')
    },
    {
      path: '/polices',
      name: 'polices',
      component: loadView('polices')
    },
    {
      path: '/Contracts',
      name: 'Contracts',
      component: loadView('Contracts')
    },
    {
      path: '/Subscribe',
      name: 'Subscribe',
      component: loadView('Subscribe')
    },
    {
      path: '/payemnt-status/:order_id/:general_o_type',
      name: 'PayemntStatus',
      component: loadView('PayemntStatus')
    },
    {
      path: '/Contact-Us',
      name: 'ContactUs',
      component: loadView('ContactUs')
    },
    {
      path: '/serviceNet',
      name: 'serviceNet',
      component: loadView('serviceNet')
    },
    {
      path: '/About',
      name: 'About',
      component: loadView('About')
    },
    {
      path: '/Login',
      name: 'Login',
      redirect: () => { window.location.href = 'http://admin.alreaaiaa.com' }
    },
    {
      path: '*',
      name: 'not-found',
      component: loadView('404'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  router.options.routes.forEach((route) => {
    if (to.matched[0].path === route.path && route.blocked) {
      console.log('one of them');
      axios.get(`https://api.alreaaiaa.com/api/rules`)
        .then(res => {
          const blocked = res.data[0].visitors_link;
          console.log('blocked => ', blocked);
          if (blocked == 0) {
            next({ name: 'not-found' })

          } else if (blocked == 1) {
            next()
          }
        })
        .catch((e) => {
          console.log(e);
        })
    }
    next()
  });
})

export default router


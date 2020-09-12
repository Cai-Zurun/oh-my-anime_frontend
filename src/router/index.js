import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Anime',
    component: () => import('../views/Anime.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // if (from === 'WafDetaills') {
//   //   // always clear server and uri info
//   //   sessionStorage.removeItem('serverId')
//   //   sessionStorage.removeItem('uriId')
//   // }
//   // 路由守卫
//   var token = config.sessionId
//
//   if (!token) {
//     if (to.name !== 'Login' && to.name !== 'Register') {
//       next({
//         name: 'Login'
//       })
//     }
//     next()
//   } else {
//     if (to.name === 'Login' || to.name === 'Register') {
//       next({
//         name: 'Anime'
//       })
//     }
//     next()
//   }
// })

export default router


const routes = [

  {
    path: '/',
    component: ()=> import('pages/login.vue'),
    name:'login'
  },
  {
    path: '/mainmenu',
    component: ()=> import('pages/mainmenu.vue'),
    name:'mainmenu'
  },
  {
    path: '/info/:id',
    component: ()=> import('pages/info.vue'),
    name:'info'
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

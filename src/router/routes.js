
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
  {
    path: '/sensor/:id',
    component: ()=> import('pages/sensor.vue'),
    name:'sensor'
  },
  {
    path: '/report/:id',
    component: ()=> import('pages/report.vue'),
    name:'report'
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

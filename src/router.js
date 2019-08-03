import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:"/Audio"
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/iviewProgress',
      name:'iviewProgress',
      component:()=>import ('./views/iview/IviewProgress')
    },
    {
      path:'/iviewIcon',
      name:'iviewIcon',
      component:()=>import ('./views/iview/IviewIcon')
    },
     {
      path:'/iviewDate',
      name:'iviewDate',
      component:()=>import ('./views/iview/IviewDate')
    },
    {
      path:'/messageWarn',
      name:'messageWarn',
      component:()=>import ('./views/iview/MessageWarn')
    },
    {
      path:'/fontLogo',
      name:'fontLogo',
      component:()=>import ('./views/fontAweSome/FontLogo')
    },
    {
      path:'/eleTree',
      name:'eleTree',
      component:()=>import ('./views/element/EleTree')
    },
    {
      path:'/checkBox',
      name:'checkBox',
      component:()=>import ('./views/element/CheckBox')
    },
    {
      path:'/swiperBannerModule',
      name:'swiperBannerModule',
      component:()=>import ('./views/swiper/SwiperBannerModule')
    },
    {
      path:'/Echarts',
      name:'Echarts',
      component:()=>import ('./views/ec/Echarts')
    },
    {
      path:'/UikitUpload',
      name:'UikitUpload',
      component:()=>import ('./views/uikit/UikitUpload')
    },
    {
      path:'/Audio',
      name:'Audio',
      component:()=>import ('./views/element/Audio')
    },
    
    {path:"*",redirect:"/Audio"}





  ]
  
})

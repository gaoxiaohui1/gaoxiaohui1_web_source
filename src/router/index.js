 import Vue from 'vue'
 import Router from 'vue-router'

 Vue.use(Router)
 const routes = []

 // 错误页面路由
 import errorPage from '@/errorPage/route.js'
 Array.prototype.push.apply(routes, errorPage)

 // CMS模板前台路由
 import cmsFPRoutes from '@/modules/cms/frontPage/route.js'
 Array.prototype.push.apply(routes, cmsFPRoutes)

 /* // CMS模板后台路由
 import cmsBPRoutes from '@/modules/cms/backPage/route.js'
 Array.prototype.push.apply(routes, cmsBPRoutes) */

 export default new Router({
   // mode: 'history', //后端支持可开
   scrollBehavior: () => ({
     y: 0
   }),
   routes
 })
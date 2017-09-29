import router from '../router'
import store from '../store'
import auth from '../utils/auth'

const whitelist = ['/', '/401', '/404', '/error'] // 白名单
const cmsbpwhitelist = ['/cms/bp/regist', '/cms/bp/login'] // cms后台白名单
router.beforeEach((to, from, next) => {
  if (to.path.includes('/cms/')) { // cms的
    if (to.path.includes('/cms/fp/')) { // cms前台的
      next()
    } else if (to.path.includes('/cms/bp/')) { // cms后台的
      if (cmsbpwhitelist.includes(to.path)) { // cms后台白名单
        next()
      } else {
        if (auth.getCMSToken()) { // 是否登陆
          if (store.getters.cmsUser === {}) { // 当前登陆人信息
            store.dispatch('GetUserInfoCMS').then(r => { // 获取当前登陆人信息
              next()
            }).catch(e => {
              next({ path: '/error', query: { msg: '获取登陆人员信息错误' }})
            })
          } else {
            next()
          }
        } else {
          next({ path: '/cms/bp/login' })
        }
      }
    } else {
      next({ path: '/404' })
    }
  } else {
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next({ path: '/404' })
    }
  }
})

import router from '@/router'

const whitelist = ['/', '/401', '/404']
router.beforeEach((to, from, next) => {
  if (to.path.includes('/cms/')) { // cms的
    if (to.path.includes('/cms/fp/')) { // cms前台的
      next()
    } else { // cms后台的
      next()
    }
  } else {
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next({ path: '/404' })
    }
  }
})

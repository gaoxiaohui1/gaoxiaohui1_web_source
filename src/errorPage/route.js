const notAuth = r => require.ensure([], () => r(require('./401.vue')), 'notAuth')
const notFind = r => require.ensure([], () => r(require('./404.vue')), 'notFind')
export default [{
    path: '/401',
    component: notAuth,
    name: '无权限'
  },
  {
    path: '/404',
    component: notFind,
    name: '未找到'
  }
]
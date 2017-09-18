const detail = r => require.ensure([], () => r(require('./detail/detail.vue')), 'detail')
const statistics = r => require.ensure([], () => r(require('./detail/statistics.vue')), 'statistics')
const clueTrace = r => require.ensure([], () => r(require('./clueTrace/clueTrace.vue')), 'clueTrace')
const projManage = r => require.ensure([], () => r(require('./projManage/projManage.vue')), 'projManage')
export default [{
    path: '/xf/detail',
    component: detail
  },
  {
    path: '/xf/statistics',
    component: statistics
  },
  {
    path: '/xf/clueTrace',
    component: clueTrace
  },
  {
    path: '/xf/projManage',
    component: projManage
  }
]
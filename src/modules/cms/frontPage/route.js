import layOut from './layouts/layout'
const home = r => require.ensure([], () => r(require('./home/index.vue')), 'home')
const list = r => require.ensure([], () => r(require('./news/list.vue')), 'list')
const detail = r => require.ensure([], () => r(require('./news/detail.vue')), 'detail')
const about = r => require.ensure([], () => r(require('./about/index.vue')), 'about')
export default [{
    path: '/cms/fp/home',
    redirect: '/cms/fp/home/index',
    component: layOut,
    name: '首页',
    children: [{ path: 'index', component: home, name: '首页' }]
  },
  {
    path: '/cms/fp/news',
    redirect: '/cms/fp/news/list',
    component: layOut,
    name: '新闻',
    children: [{ path: 'list', component: list, name: '新闻列表' },
      { path: 'detail', component: detail, name: '新闻详情' }
    ]
  },
  {
    path: '/cms/fp/about',
    redirect: '/cms/fp/about/index',
    component: layOut,
    name: '关于',
    children: [{ path: 'index', component: about, name: '关于' }]
  }
]
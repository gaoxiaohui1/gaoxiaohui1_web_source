import layout from './layouts/layout.vue'
import home from './home/index.vue'
import list from './news/list.vue'
import detail from './news/detail.vue'
import about from './about/index.vue'

export default [{
  path: '/cms/fp/home',
  name: 'home',
  redirect: '/cms/fp/home/index',
  component: layout,
  children: [{ path: 'index', component: home, name: '首页' }]
},
{
  path: '/cms/fp/news',
  redirect: '/cms/fp/news/list',
  component: layout,
  name: 'newslist',
  children: [{ path: 'list', component: list, name: '新闻列表' },
    { path: 'detail', component: detail, name: '新闻详情' }
  ]
},
{
  path: '/cms/fp/about',
  redirect: '/cms/fp/about/index',
  component: layout,
  name: '关于',
  children: [{ path: 'index', component: about, name: '关于' }]
}]

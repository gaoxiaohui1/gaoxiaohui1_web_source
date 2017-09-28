import layout from './layouts/layout.vue'
import home from './home/index.vue'
import list from './news/list.vue'
import detail from './news/detail.vue'
import about from './about/index.vue'

export default [{
  path: '/cms',
  name: 'cms首页',
  redirect: '/cms/fp/home/index',
  component: layout
},
{
  path: '/cms/fp',
  name: 'cms前台首页',
  redirect: '/cms/fp/home/index',
  component: layout
},
{
  path: '/cms/fp/home',
  name: 'cmsHome首页',
  redirect: '/cms/fp/home/index',
  component: layout,
  children: [{ path: 'index', component: home, name: 'cmsHomeIndex首页' }]
},
{
  path: '/cms/fp/news',
  redirect: '/cms/fp/news/list',
  component: layout,
  name: '新闻列表',
  children: [{ path: 'list', component: list, name: '新闻列表页' },
    { path: 'detail', component: detail, name: '新闻详情页' }
  ]
},
{
  path: '/cms/fp/about',
  redirect: '/cms/fp/about/index',
  component: layout,
  name: '关于',
  children: [{ path: 'index', component: about, name: '关于页' }]
}]

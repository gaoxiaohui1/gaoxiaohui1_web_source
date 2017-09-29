import layout from './layouts/layout.vue'
import home from './home/index.vue'
import login from './login/index.vue'
import regist from './regist/index.vue'
import list from './news/list.vue'
import detail from './news/detail.vue'
import add from './news/add.vue'

export default [{
  path: '/cms/bp',
  name: '后台首页',
  redirect: '/cms/bp/home/index',
  component: layout
},
{
  path: '/cms/bp/home',
  name: 'cmsHome后台首页',
  redirect: '/cms/bp/home/index',
  component: layout,
  children: [{ path: 'index', component: home, name: '后台——首页' }]
},
{
  path: '/cms/bp/news',
  redirect: '/cms/bp/news/list',
  component: layout,
  name: '后台新闻列表',
  children: [{ path: 'list', component: list, name: '后台新闻列表页' },
    { path: 'detail', component: detail, name: '后台新闻详情页' },
    { path: 'add', component: add, name: '后台新闻新增页' }
  ]
},
{
  path: '/cms/bp/regist',
  component: regist,
  name: '注册'
},
{
  path: '/cms/bp/login',
  component: login,
  name: '登陆'
}]

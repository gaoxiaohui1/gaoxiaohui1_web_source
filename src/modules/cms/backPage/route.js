import login from './login/index.vue'
import regist from './regist/index.vue'
import list from './news/list.vue'
import detail from './news/detail.vue'

export default [{
  path: '/cms/bp',
  name: '后台首页',
  redirect: '/cms/bp/news/list',
  component: list
},
{
  path: '/cms/bp/news',
  name: '后台列表页',
  redirect: '/cms/bp/news/list',
  component: list
},
{
  path: '/cms/bp/news/detail',
  name: '后台详情页',
  component: detail
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

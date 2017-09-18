import notAuth from './401.vue'
import notFind from './404.vue'
export default [{
  path: '/401',
  component: notAuth,
  name: '无权限'
},
{
  path: '/404',
  component: notFind,
  name: '未找到'
}]

import Cookies from 'js-cookie'
const cmsTokenKey = 'cms_token'

export default {
  getCMSToken() {
    return Cookies.get(cmsTokenKey)
  },
  setCMSToken(token) {
    return Cookies.set(cmsTokenKey, token)
  },
  removeCMSToken() {
    return Cookies.remove(cmsTokenKey)
  }
}

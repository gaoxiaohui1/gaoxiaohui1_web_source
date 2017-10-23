const cmsTokenKey = 'cms_token'

export default {
  getCMSToken() {
    return window.sessionStorage.getItem(cmsTokenKey)
  },
  setCMSToken(token) {
    return window.sessionStorage.setItem(cmsTokenKey, token)
  },
  removeCMSToken() {
    return window.sessionStorage.removeItem(cmsTokenKey)
  }
}

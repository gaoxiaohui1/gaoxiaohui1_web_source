const getters = {
  cmsToken: state => state.cmsUser.token,
  cmsUser: state => state.cmsUser.currentUser
}
export default getters

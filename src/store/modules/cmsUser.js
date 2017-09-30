import auth from '@/utils/auth'
import cmsAPI from '@/modules/cms/api/userAPI'

const user = {
  state: {
    currentUser: { ID: -1 }, // 当前登陆人信息
    token: auth.getCMSToken() // token
  },
  mutations: {
    SET_USER: (state, currentUser) => {
      state.currentUser = currentUser
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    /**
     * 登陆
     */
    LoginCMS: ({ commit }, logInfo) => {
      return new Promise((resolve, reject) => {
        try {
          const loginRes = cmsAPI.login(logInfo)
          if (loginRes.IsSuccess) {
            auth.setCMSToken(loginRes.Data)
            commit('SET_TOKEN', loginRes.Data)
            resolve(loginRes)
          } else {
            auth.removeCMSToken()
            commit('SET_TOKEN', '')
            reject(loginRes)
          }
        } catch (e) {
          reject({ IsSuccess: false, Msg: '登陆失败:' + e })
        }
      })
    },
    /**
     * 登出
     */
    LogOutCMS: ({ commit }) => {
      return new Promise((resolve, reject) => {
        try {
          auth.removeCMSToken()
          commit('SET_TOKEN', '')
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },
    /**
     * 获取用户信息
     */
    GetUserInfoCMS: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        try {
          const userInfoRes = cmsAPI.getUserInfoByToken(state.token)
          if (userInfoRes.IsSuccess) {
            commit('SET_USER', userInfoRes.Data)
            resolve()
          } else {
            commit('SET_USER', { ID: -1 })
            reject(userInfoRes)
          }
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}

export default user

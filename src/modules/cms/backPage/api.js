import dateFormate from '@/utils/dateFormate'

export default {
  /**
   * 校验注册用户名(true-存在重复用户名)
   * @param {*用户名} userName
   */
  validateRegistName(userName) {
    const sourceIDStr = window.localStorage.getItem('cms_user_ids')
    if (sourceIDStr === null || sourceIDStr === '') {
      return { Data: false, Msg: '' }
    } else {
      const userNames = JSON.parse(sourceIDStr)
      const isExist = userNames.findIndex(x => x.userName === userName && x.userStatus === 0) > -1
      return { Data: isExist, Msg: isExist ? '用户名已存在' : '' }
    }
  },
  /**
   * 注册
   * @param {*注册信息} info
   */
  regist(info) {
    try {
      const operateTime = dateFormate.dateFormate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      const sourceIDStr = window.localStorage.getItem('cms_user_ids')
      const user_id = { ID: 0, userName: info.userName, userStatus: 0 }
      const user_i = { ID: 0, userName: info.userName, passWord: info.passWord, nickName: info.nickName, userStatus: 0, insertTime: operateTime }
      if (sourceIDStr === null || sourceIDStr === '') {
        window.localStorage.setItem('cms_user_ids', JSON.stringify([user_id]))
        window.localStorage.setItem('cms_user_0', JSON.stringify(user_i))
        return { Data: true, Msg: '注册成功' }
      } else {
        const userIDs = JSON.parse(sourceIDStr)
        if (userIDs.findIndex(x => x.userName === info.userName && x.userStatus === 0) > -1) {
          return { Data: false, Msg: '注册失败：用户名已存在' }
        }
        const index = userIDs.length
        user_id.ID = index
        user_i.ID = index
        userIDs.push(user_id)
        window.localStorage.setItem('cms_user_ids', JSON.stringify(userIDs))
        window.localStorage.setItem('cms_user_' + index, JSON.stringify(user_i))
        return { Data: true, Msg: '注册成功' }
      }
    } catch (e) {
      console.log('regist_error:', e)
      return { Data: false, Msg: '注册失败' }
    }
  },
  /**
   * 登陆
   * @param {*登录信息} info
   */
  login(info) {
    try {
      const sourceIDStr = window.localStorage.getItem('cms_user_ids')
      if (sourceIDStr === null || sourceIDStr === '') {
        return { Data: false, Msg: '登陆失败：账号不存在' }
      }
      const userIDs = JSON.parse(sourceIDStr)
      const matchUserID = userIDs.find(x => x.userName === info.userName && x.userStatus === 0)
      if (matchUserID === undefined) {
        return { Data: false, Msg: '登陆失败：账号不存在' }
      }
      const userInfoStr = window.localStorage.getItem('cms_user_' + matchUserID.ID)
      const userInfo = JSON.parse(userInfoStr)
      if (userInfo.passWord === info.passWord) {
        return { Data: true, Msg: '登陆成功' }
      }
      return { Data: false, Msg: '登陆失败：密码错误' }
    } catch (e) {
      console.log('login_error:', e)
      return { Data: false, Msg: '登陆失败' }
    }
  }
}

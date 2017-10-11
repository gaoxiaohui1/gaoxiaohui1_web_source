import dateFormate from '@/utils/dateFormate'
import store from '@/store'

export default {
  /**
   * 获取分组后的信息（类型||作者||发布人||标题）
   * @param {*{type:'author',label:'作者'}} info
   */
  getDistinctInfos(info) {
    try {
      const jsonStr = window.localStorage.getItem('cms_news_' + info.type)
      if (jsonStr === null || jsonStr === '') {
        return { IsSuccess: true, Msg: '获取' + info.label + '成功', Data: [] }
      }
      return { IsSuccess: true, Msg: '获取' + info.label + '成功', Data: JSON.parse(jsonStr) }
    } catch (e) {
      console.log('get_' + info.type + '_error:', e)
      return { IsSuccess: false, Msg: '获取' + info.label + '失败', Data: [] }
    }
  },
  /**
   * 获取新闻列表
   * @param {*} searchInfo
   */
  getNewsList(searchInfo) {
    try {
      const idStr = window.localStorage.getItem('cms_news_ids')
      if (idStr === null || idStr === '') {
        return { IsSuccess: true, Msg: '获取列表成功', Data: { data: [], totalCount: 0 }}
      }
      const totalMatchNews = []
      JSON.parse(idStr).forEach(x => {
        const currentNews = JSON.parse(window.localStorage.getItem('cms_news_' + x.ID))
        if (searchInfo.ID !== undefined && searchInfo.ID !== '' && currentNews.ID !== parseInt(searchInfo.ID)) {
          return false
        }
        if (searchInfo.type !== undefined && searchInfo.type !== '' && currentNews.type !== searchInfo.type) {
          return false
        }
        if (searchInfo.author !== undefined && searchInfo.author !== '' && currentNews.author !== searchInfo.author) {
          return false
        }
        if (searchInfo.newsStatus !== undefined && searchInfo.newsStatus !== '' && parseInt(searchInfo.newsStatus) !== -1 && currentNews.newsStatus !== parseInt(searchInfo.newsStatus)) {
          return false
        }
        if (searchInfo.publishUserID !== undefined && searchInfo.publishUserID !== '' && parseInt(searchInfo.publishUserID) !== -2 && currentNews.publishUserID !== parseInt(searchInfo.publishUserID)) {
          return false
        }
        totalMatchNews.push(currentNews)
      })
      const pagedNews = totalMatchNews.filter((item, index) => index < searchInfo.pageSize * searchInfo.pageIndex && index >= searchInfo.pageSize * (searchInfo.pageIndex - 1))
      if (pagedNews.length > 0) {
        const publishUserStr = window.localStorage.getItem('cms_news_publishUser')
        pagedNews.forEach(x => {
          if (x.publishUserID > -1) {
            x.publishUser = JSON.parse(publishUserStr).find(y => y.ID === x.publishUserID).name
          }
          if (x.newsStatus === 0) {
            x.newsStatusDes = '草稿'
          }
          if (x.newsStatus === 1) {
            x.newsStatusDes = '发布'
          }
          if (x.newsStatus === 9) {
            x.newsStatusDes = '删除'
          }
        })
      }
      return { IsSuccess: true, Msg: '获取列表成功', Data: { data: pagedNews, totalCount: totalMatchNews.length }}
    } catch (e) {
      console.log('get_list_error:', e)
      return { IsSuccess: false, Msg: '获取列表失败', Data: { data: [], totalCount: 0 }}
    }
  },
  /**
   * 新增新闻
   * @param {*新闻详情} info
   */
  addNews(info) {
    try {
      const operateTime = dateFormate.dateFormate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      const sourceIDStr = window.localStorage.getItem('cms_news_ids')
      const news_id = { ID: 0, newsStatus: 0 }
      const news_i = { // 新闻实体
        ID: 0, // 主键ID
        title: info.title.trim(), // 标题
        type: info.type.trim(), // 类型
        content: info.content.trim(), // 内容
        author: info.author.trim(), // 作者
        newsStatus: 0, // 状态（0-草稿;1-发布;9-删除）
        insertUserID: store.getters.cmsUser.ID, // 录入人ID
        insertTime: operateTime, // 录入时间
        updateTime: operateTime, // 修改时间
        readCount: 0, // 阅读次数
        publishUserID: -1, // 发布人
        publishTime: '' // 发布时间
      }
      if (sourceIDStr === null || sourceIDStr === '') { // 第一条
        window.localStorage.setItem('cms_news_ids', JSON.stringify([news_id])) // 保存主键信息
        window.localStorage.setItem('cms_news_0', JSON.stringify(news_i)) // 保存详情信息
        window.localStorage.setItem('cms_news_type', JSON.stringify([news_i.type])) // 保存类型信息
        window.localStorage.setItem('cms_news_author', JSON.stringify([news_i.author])) // 保存作者信息
        window.localStorage.setItem('cms_news_title', JSON.stringify([{ ID: 0, title: news_i.title }])) // 保存标题信息
        return { IsSuccess: true, Msg: '新闻添加成功' }
      } else {
        const newsIDs = JSON.parse(sourceIDStr)
        const index = newsIDs.length
        news_id.ID = index
        news_i.ID = index
        newsIDs.push(news_id)
        window.localStorage.setItem('cms_news_ids', JSON.stringify(newsIDs)) // 修改主键信息
        window.localStorage.setItem('cms_news_' + index, JSON.stringify(news_i)) // 保存详情信息
        const types = JSON.parse(window.localStorage.getItem('cms_news_type')) // 获取已存在的类型信息
        if (!types.includes(news_i.type)) {
          types.push(news_i.type)
          window.localStorage.setItem('cms_news_type', JSON.stringify(types)) // 保存类型信息
        }
        const authors = JSON.parse(window.localStorage.getItem('cms_news_author')) // 获取已存在的作者信息
        if (!authors.includes(news_i.author)) {
          authors.push(news_i.author)
          window.localStorage.setItem('cms_news_author', JSON.stringify(authors)) // 保存作者信息
        }
        const titles = JSON.parse(window.localStorage.getItem('cms_news_title')) // 获取已存在的标题信息
        titles.push({ ID: news_i.ID, title: news_i.title })
        window.localStorage.setItem('cms_news_title', JSON.stringify(titles)) // 保存标题信息
        return { IsSuccess: true, Msg: '新闻添加成功' }
      }
    } catch (e) {
      console.log('addNews_error:', e)
      return { IsSuccess: false, Msg: '新闻添加失败' }
    }
  },
  /**
   * 获取新闻详情
   * @param {*} id
   */
  getNewsDetail(id) {
    try {
      const newsStr = window.localStorage.getItem('cms_news_' + id)
      if (newsStr === null || newsStr === '') {
        return { IsSuccess: false, Msg: '参数错误', Data: {}}
      } else {
        const news = JSON.parse(newsStr)
        if (news.publishUserID > -1) {
          news.publishUser = JSON.parse(window.localStorage.getItem('cms_user_' + news.publishUserID)).nickName
        }
        if (news.newsStatus === 0) {
          news.newsStatusDes = '草稿'
        }
        if (news.newsStatus === 1) {
          news.newsStatusDes = '发布'
        }
        if (news.newsStatus === 9) {
          news.newsStatusDes = '删除'
        }
        return { IsSuccess: true, Msg: '获取新闻详情成功', Data: news }
      }
    } catch (e) {
      console.log('getNewsDetail_error:', e)
      return { IsSuccess: false, Msg: '获取新闻详情失败', Data: {}}
    }
  },
  /**
   * 新增阅读量
   * @param {*} id
   */
  addReadCount(id) {
    try {
      const key = 'cms_news_' + id
      const newsStr = window.localStorage.getItem(key)
      if (newsStr === null || newsStr === '') {
        return { IsSuccess: false, Msg: '参数错误', Data: {}}
      } else {
        const news = JSON.parse(newsStr)
        news.readCount += 1
        window.localStorage.setItem(key, JSON.stringify(news))
        return { IsSuccess: true, Msg: '新增阅读量成功', Data: news }
      }
    } catch (e) {
      console.log('addReadCount_error:', e)
      return { IsSuccess: false, Msg: '新增阅读量失败', Data: {}}
    }
  },
  /**
   * 发布、取消发布、删除
   * @param {*} info
   */
  operateNews(info) {
    try {
      const key = 'cms_news_' + info.id
      const newsStr = window.localStorage.getItem(key)
      if (newsStr === null || newsStr === '') {
        return { IsSuccess: false, Msg: '参数错误', Data: {}}
      } else {
        const news = JSON.parse(newsStr)
        let des = ''
        if (info.type === 'publish') {
          des = '发布'
          news.newsStatus = 1
          news.publishUserID = store.getters.cmsUser.ID
          const pu = { ID: store.getters.cmsUser.ID, name: store.getters.cmsUser.userName, count: 1 }
          const puKey = 'cms_news_publishUser'
          const puStr = window.localStorage.getItem(puKey)
          if (puStr === null || puStr === '') {
            window.localStorage.setItem(puKey, JSON.stringify([pu])) // 保存发布人信息
          } else {
            const puInfos = JSON.parse(puStr)
            if (puInfos.find(x => x.ID === pu.ID) === undefined) {
              puInfos.push(pu)
            } else {
              puInfos.forEach(x => {
                if (x.ID === pu.ID) {
                  x.count = x.count + 1
                }
              }) // 更新发布人信息
            }
            window.localStorage.setItem(puKey, JSON.stringify(puInfos)) // 更新发布人信息
          }
        }
        if (info.type === 'callBackPublish') {
          des = '取消发布'
          news.newsStatus = 0
          news.publishUserID = -1
          const pu = { ID: store.getters.cmsUser.ID, name: store.getters.cmsUser.userName, count: 1 }
          const puKey = 'cms_news_publishUser'
          const puInfos = JSON.parse(window.localStorage.getItem(puKey))
          const sourcePU = puInfos.find(x => x.ID === pu.ID)
          if (sourcePU.count === 1) {
            const newPUInfos = puInfos.filter(x => x.ID !== pu.ID)
            window.localStorage.setItem(puKey, JSON.stringify(newPUInfos)) // 更新发布人信息
          } else {
            puInfos.forEach(x => {
              if (x.ID === pu.ID) {
                x.count = x.count - 1
              }
            })
            window.localStorage.setItem(puKey, JSON.stringify(puInfos)) // 更新发布人信息
          }
        }
        if (info.type === 'delete') {
          des = '删除'
          news.newsStatus = 9
        }
        window.localStorage.setItem(key, JSON.stringify(news))
        return { IsSuccess: true, Msg: des + '成功', Data: news }
      }
    } catch (e) {
      console.log('addReadCount_error:', e)
      return { IsSuccess: false, Msg: '操作失败', Data: {}}
    }
  }
}

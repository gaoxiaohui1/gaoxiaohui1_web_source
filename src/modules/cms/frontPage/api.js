import fetch from '@/utils/fetch'

export default {
  getNewsTye() { // 获取新闻类型
    return [{ value: 10, label: '财经' }, { value: 20, label: '娱乐' }, { value: 30, label: '体育' }, { value: 40, label: '汽车' }, { value: 50, label: '房产' }]
  },
  getNewsList(searchInfo) {
    return fetch({ // 获取新闻列表
      url: 'http://getNewsList',
      params: searchInfo,
      method: 'get'
    })
  },
  getNewsDetail(searchInfo) {
    return fetch({ // 获取新闻明细
      url: 'http://getNewsDetail',
      params: searchInfo,
      method: 'get'
    })
  },
  getNewsAuthors() {
    return fetch({ // 获取新闻作者列表
      url: 'http://getNewsAuthors',
      params: { v: new Date() },
      method: 'get'
    })
  },
  getNewsPublishUsers() {
    return fetch({ // 获取新闻发布者列表
      url: 'http://getNewsPublishUsers',
      params: { v: new Date() },
      method: 'get'
    })
  },
  getNewsTitles() {
    return fetch({ // 获取新闻标题列表
      url: 'http://getNewsTitles',
      params: { v: new Date() },
      method: 'get'
    })
  }
}

import Mock from 'mockjs'

export default {
  getNewsList() {
    Mock.mock(/\/getNewsList/, 'get', {
      IsSuccess: true,
      Msg: '',
      Value: {
        'data|15': [{
          'ID|+1': 1,
          'title': '@ctitle',
          'type|1': ['财经', '娱乐', '体育', '汽车', '房产'],
          'author': '@cname',
          'publishTime': '@date',
          'publishUser': '@cname',
          'readCount': '@integer(0, 100)'
        }],
        totalCount: 33
      }
    })
  },
  getNewsDetail() {
    Mock.mock(/\/getNewsDetail/, 'get', {
      IsSuccess: true,
      Msg: '',
      Value: {
        data: {
          'ID|+1': 1,
          'title': '@ctitle',
          'content': '@cparagraph',
          'type|1': ['财经', '娱乐', '体育', '汽车', '房产'],
          'author': '@cname',
          'publishTime': '@date',
          'publishUser': '@cname',
          'readCount': '@integer(0, 100)'
        }
      }
    })
  }
}

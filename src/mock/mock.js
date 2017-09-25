import Mock from 'mockjs'
import cmsFPMock from '@/modules/cms/frontPage/mock'
export default Mock

// // 模拟Ajax请求响应时间
// Mock.setup({
//   timeout: 2000
// })

cmsFPMock.getNewsList()
cmsFPMock.getNewsDetail()
cmsFPMock.getNewsAuthors()
cmsFPMock.getNewsPublishUsers()
cmsFPMock.getNewsTitles()


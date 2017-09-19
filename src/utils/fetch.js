import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 5000 // 请求超时时间
})

// response拦截器
service.interceptors.response.use(
  response => { // response返回格式{IsSuccess:true,Msg:'',Value:{data:[]}}
    const data = response.data
    if (data.IsSuccess) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  },
  error => {
    console.log(error)
    return Promise.reject({ IsSuccess: false, Msg: error })
  }
)

export default service

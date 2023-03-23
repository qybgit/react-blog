import axios from 'axios'
import { Navigate } from 'react-router-dom'

const http = axios.create(
  {
    baseURL: 'http://localhost:8081',
    timeout: 5000
  }
)
//请求
http.interceptors.request.use(
  (config) => {
    const tokenE = localStorage.getItem("blog-key")
    if (tokenE) {
      const { token } = JSON.parse(tokenE)
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, (error) => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export { http }
import { http } from '@/utils/index'
import { makeAutoObservable } from 'mobx'
class LoginStore {
  token = ''
  constructor() {
    //响应式
    makeAutoObservable(this)
  }
  setToken = async ({ nickName, password }) => {

    const res = await http.post('http://localhost:8081/login', { nickName, password })
    this.token = res.data.token
    return res

  }
}
export default LoginStore
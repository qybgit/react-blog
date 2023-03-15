import logo from '@/asstes/login.png'
import styled from 'styled-components'
import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useStroe } from '@/store/index'
import LoginStore from '@/store/login.Store'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function Login() {
  const loginStroe = new LoginStore()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    nickName: '',
    password: '',
  })
  // const toastOptions = {
  //   position: 'bottom-right',
  //   autoClose: 8000,
  //   pauseOnHover: true,
  //   draggable: true,
  //   theme: 'dark',
  // }
  const handChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data } = await loginStroe.setToken({
      nickName: values.nickName,
      password: values.password,
    })
    if (data.code == 200) {
      message.success(data.msg)
      localStorage.setItem('blog-key', JSON.stringify(data.data))
    } else {
      message.error(data.msg)
    }
    navigate('/')
  }
  // const handleChick = () => {
  //   const { nickName, password } = values
  //   if (password == '') {
  //     console.log('test')
  //     toast.error('密码不能为空', toastOptions)
  //     return false
  //   } else if (nickName === '') {
  //     toast.error('用户名不能为空', toastOptions)
  //     return false
  //   }
  // }
  return (
    <>
      <FromContainer>
        <div className="box">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img src={logo} alt="" />
              <h1>Hi BLOG</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="nickName"
              required="true"
              // pattern="[A-Za-z0-9]{8,}"
              title="请输入包含大写字母的不小于八位数"
              onChange={(e) => handChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required="true"
              // pattern="[A-Za-z0-9]{8,}"
              title="请输入包含大写字母的不小于八位数"
              onChange={(e) => handChange(e)}
            />
            <button type="submit">登陆</button>

            <span> 没有账号？ 注册</span>
          </form>
        </div>
      </FromContainer>
    </>
  )
}

const FromContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: white;
  background-image: url('../asstes/login.png');
  align-items: center;
  justify-items: center;
  justify-content: center;
  .box {
    border-radius: 1;
  }
  input {
  }
  form {
    background-color: #f1ebe8;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 1rem;
    gap: 2rem;
  }
  .brand {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    gap: 1rem;
    .h1 {
      color: white;
      text-align: center;
      font-weight: 100;
    }
    img {
      height: 5rem;
    }
  }
`

export default Login

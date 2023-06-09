import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Card, Avatar, message } from 'antd'
import styled from 'styled-components'
import LoginStore from '@/store/login.Store'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
function Login() {
  const [from] = Form.useForm()
  const passwordPattern = /^(?=.*[A-Z]).{8,}$/

  const loginStroe = new LoginStore()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    nickName: '',
    password: '',
  })

  const handlePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onFinishDate = async (e) => {
    if (false) {
    } else {
      const { data } = await loginStroe.setToken({
        nickName: values.nickName,
        password: values.password,
      })
      if (data.code == 200) {
        message.success(data.msg)
        localStorage.setItem('blog-key', JSON.stringify(data.data))
        navigate('/')
      } else {
        message.error(data.msg)
      }
    }
  }

  return (
    <FromContainer>
      <div className="box">
        <Card>
          <div className="box-avatar">
            <Avatar
              shape="square"
              size={120}
              gap={5}
              style={{ backgroundColor: ' #333' }}>
              YuanBo Blog
            </Avatar>
          </div>

          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishDate}>
            <Form.Item
              name="nickName"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
                name="nickName"
                onChange={(e) => handlePassword(e)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入包含大写字母的不小于八位数',
                },
              ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                name="password"
                placeholder="请输入密码"
                title="请输入包含大写字母的不小于八位数"
                onChange={(e) => handlePassword(e)}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                忘记密码？
              </a>
            </Form.Item>
            <div className="box-button">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button">
                登陆
              </Button>
              Or <a href="/register">注册</a>
            </div>
          </Form>
        </Card>
      </div>
    </FromContainer>
  )
}
export default Login
const FromContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;

  .box {
    width: 20%;
    height: 50%;
    .box-button {
      text-align: center;
    }
    .box-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      padding-bottom: 1em;
    }
  }
`

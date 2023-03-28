import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Card, Avatar, message } from 'antd'
import styled from 'styled-components'
import LoginStore from '@/store/login.Store'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { http } from '@/utils'
function Register() {
  const [from] = Form.useForm()
  const passwordPattern = /^(?=.*[A-Z]).{8,}$/

  const loginStroe = new LoginStore()
  const navigate = useNavigate()
  const [isone, setIsone] = useState(false)

  const [values, setValues] = useState({
    nickName: '',
    password: '',
    passwordAgain: '',
  })

  const handlePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onFinishDate = async (e) => {
    if (!passwordPattern.test(values.password)) {
      message.error('密码需包含大写字母')
    } else {
      if (values.password === values.passwordAgain) {
        const { data } = await http.post('/register', {
          nickName: values.nickName,
          password: values.password,
        })
        if (data.code == 200) {
          message.success(data.msg)
          navigate('/login')
        } else {
          message.error(data.msg)
        }
      } else {
        message.error('密码不一致')
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
              注册
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
                  message: '输入用户名!',
                },
                {
                  min: 6,
                  max: 12,
                  message: '用户名长度不小6',
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
                  message: '请输入密码',
                },
                {
                  min: 8,
                  max: 15,
                  message: '输入密码长度不得小于8',
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
              <Form.Item
                name="passwordAgain"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: '确认密码',
                  },
                  {
                    min: 8,
                    max: 15,
                    message: '输入密码长度不得小于8',
                  },
                  // ({ getFieldValue }) => ({
                  //   validator(_, value) {
                  //     if (!value || getFieldValue('password') === value) {
                  //       return Promise.resolve()
                  //     }
                  //     return Promise.reject(new Error('两次输入的密码不一致'))
                  //   },
                  // }),
                ]}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  name="passwordAgain"
                  placeholder="确认密码"
                  title="确认密码"
                  onChange={(e) => handlePassword(e)}
                  validateTrigger={'onSubmit'}
                />
              </Form.Item>
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
                注册
              </Button>
              Or <a href="">登陆</a>
            </div>
          </Form>
        </Card>
      </div>
    </FromContainer>
  )
}
export default Register
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

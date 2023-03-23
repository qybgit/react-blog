import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { message, Popconfirm, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import {
  GithubFilled,
  WechatFilled,
  TwitterSquareFilled,
  QqSquareFilled,
} from '@ant-design/icons'

function Layout() {
  const navigate = useNavigate()

  const username = () => {
    const token = localStorage.getItem('blog-key')
    const confirm = () => {
      console.log(localStorage.removeItem('blog-key'))
      message.success('退出成功')
      navigate('/index')
    }
    if (!token) {
      return (
        <Link to="/login">
          <Button>Go to login</Button>
        </Link>
      )
    } else {
      const { account } = JSON.parse(token)
      return (
        <>
          <div>{account}</div>
          <Popconfirm
            placement="rightBottom"
            title="你确认退出吗"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No">
            <Button>退出</Button>
          </Popconfirm>
        </>
      )
    }
  }

  return (
    <>
      <SiteContainer>
        <div className="left-Container">
          <header className="header">
            <div className="header-brand">
              <a href="/">
                <h1>Yuan Bo's blog</h1>
              </a>
              <p>努力做得更好</p>
            </div>
            <nav className="header-nav">
              <ul>
                <li className="shoye">
                  <Link to="/index">
                    <a>
                      <i></i>
                      首页
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/tag">
                    <a>
                      <i></i>标签
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/category">
                    <a>
                      <i></i>分类
                    </a>
                  </Link>
                </li>
                <li>
                  <a>
                    <i></i>搜索
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i></i>发布
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i></i>关于
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          {/* 下半部分 */}

          <aside className="aside">
            <div className="asdie-name">
              <p>Yuan Bo</p>
              <p>一个菜鸟程序员</p>
            </div>
            <div className="asdie-tag">
              <span>
                <a href="/" rel="noopener me" target="_blank">
                  <i>
                    <GithubFilled
                      className="Git"
                      style={{ color: '#222', padding: 0 }}
                    />{' '}
                    GitHub
                  </i>
                </a>
              </span>
              <span>
                <a href="/">
                  <i>
                    <WechatFilled style={{ color: '#222', padding: 0 }} />
                    WeChat
                  </i>
                </a>
              </span>
              <span>
                <a href="/">
                  <i>
                    <QqSquareFilled style={{ color: '#222', padding: 0 }} />
                    QQ
                  </i>
                </a>
              </span>
              <span>
                <a href="/">
                  <i>
                    <TwitterSquareFilled
                      style={{ color: '#222', padding: 0 }}
                    />
                    Twitter
                  </i>
                </a>
              </span>
            </div>
          </aside>
          <div className="imag">
            <div className="imag-div">{username()}</div>
          </div>
        </div>
        <div className="right-Container">
          <Outlet />
        </div>
      </SiteContainer>
    </>
  )
}
export default Layout
const SiteContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  display: flex;
  margin: 0 auto;
  padding: 0 200px;
  justify-content: space-between;

  .left-Container {
    width: 20%;
    padding: 1em 0;

    .header {
      display: block;
      background-color: #ffffff;
      width: 100%;
      height: 55%;
      .header-brand {
        display: flex;
        width: 100%;
        height: 35%;
        background-color: #222;
        justify-content: center;
        justify-items: center;
        flex-direction: column;
        align-items: center;
        a {
          width: 100%;
          color: #fff;
          text-decoration: none;
          font-size: 1rem;
          padding: 5px;
          h1 {
            text-align: center;
          }
        }
        p {
          color: #fff;
          padding: 15px;
        }
      }
      .header-nav {
        display: block;
        width: 100%;
        height: 60%;
        ul {
          display: block;
          list-style-type: none;
          text-align: center;
          line-height: 3;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          li {
            margin: 0;
            padding: 0;
          }
          li a {
            text-decoration: none;
            display: block;
            color: #222;
            width: 100%;
          }

          li a:hover {
            background: #f5f5f5;
          }

          font-size: 1rem;
        }
      }
    }
    .aside {
      display: flex;
      width: 100%;
      height: 30%;
      justify-content: center;
      flex-direction: column;
      margin-top: 20px;
      background-color: #fff;
      gap: 10px;
      .asdie-name {
        padding: 20px;
        p {
          text-align: center;
        }
      }
      .asdie-tag {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        height: 100%;
        span {
          margin: 5px 0 0;
          width: 50%;
          text-align: center;
          i {
            text-align: center;
          }

          a {
            text-decoration: none;
            text-align: center;
            height: 50%;
            border-bottom: 0;
            border-radius: 4px;
            display: block;
          }
        }
      }
    }
    .imag {
      background-color: #fff;
      width: 100%;
      height: 15%;
      margin-top: 15px;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .imag-div {
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 2em 0;
      }
    }
  }
  .right-Container {
    display: flex;
    margin-left: 20px;
    width: 80%;
    height: 100vh;
  }
`

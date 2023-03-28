import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { message, Popconfirm, Button, Input, List } from 'antd'
import {
  SearchOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  GithubFilled,
  WechatFilled,
  TwitterSquareFilled,
  QqSquareFilled,
} from '@ant-design/icons'
import { http } from '@/utils'

function SearchModal({ onClose }) {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [articles, setArticle] = useState({})
  useEffect(() => {
    async function serachF() {
      const res = await http.post('/search', { text })
      if (res.data.code == -1) {
        navigate('/error')
      } else {
        setArticle(res.data.data)
      }
    }
    serachF()
    return () => {
      setArticle({})
    }
  }, [text])
  const handleChange = (e) => {
    setText(e.target.value)
    console.log(text)
  }
  const handleClose = () => {
    onClose(false)
  }
  const handleLink = (id) => {
    navigate(`/article/${id}`)
    onClose(false)
    window.location.reload()
  }
  return (
    <>
      <SearchContainer>
        <div className="box">
          <div className="box-search">
            <Input
              type="textarea"
              size="large"
              style={{
                paddingTop: 10,
                backgroundColor: '#fff',
                fontSize: ' 1em',
                height: '100%',
                border: 'none',
              }}
              value={text}
              onChange={handleChange}
              addonAfter={
                <Button onClick={handleClose}>
                  <CloseCircleOutlined />
                </Button>
              }
              addonBefore={<SearchOutlined />}
              placeholder="请输入"
            />
          </div>
          <div className="box-result">
            {articles && articles.length > 0 ? (
              <>
                {' '}
                {articles.map((article) => {
                  return (
                    <div className="box-list">
                      {' '}
                      <Link onClick={() => handleLink(article.id)}>
                        <a className="box-a">
                          <CalendarOutlined style={{ padding: '1em' }} />
                          <h3>{article.title}</h3>
                        </a>
                      </Link>
                    </div>
                  )
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </SearchContainer>
    </>
  )
}

function Layout() {
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        onShow(false)
      }
    }
    document.addEventListener('click', handleOutside)
    return () => {
      document.removeEventListener('click', handleOutside)
    }
  }, [])
  const username = () => {
    const token = localStorage.getItem('blog-key')
    const confirm = () => {
      localStorage.removeItem('blog-key')
      message.success('退出成功')
      window.location.reload()
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
  const onShow = (a) => {
    setShowSearch(a)
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
                  <Link to="/">
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
                {showSearch && <Overlay></Overlay>}
                <li ref={searchRef}>
                  {showSearch && <SearchModal onClose={onShow}></SearchModal>}
                  <a onClick={() => onShow(true)}>
                    <i></i>搜索{' '}
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i></i>发布
                  </a>
                </li>
                <li>
                  <a href="/about">
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
                <a
                  href="https://github.com/qybgit"
                  rel="noopener me"
                  target="_blank">
                  <GithubFilled className="Git" style={{ color: '#222' }} />
                  <i>GitHub</i>
                </a>
              </span>
              <span>
                <a href="/">
                  <WechatFilled style={{ color: '#222' }} />

                  <i>WeChat</i>
                </a>
              </span>
              <span>
                <a href="/">
                  <QqSquareFilled style={{ color: '#222' }} />
                  <i>QQ</i>
                </a>
              </span>
              <span>
                <a href="/">
                  <TwitterSquareFilled style={{ color: '#222' }} />

                  <i>Twitter</i>
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
    height: 100%;
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
          padding: 5px 0 0;
          width: 50%;
          height: 50%;
          text-align: center;

          a {
            text-decoration: none;
            text-align: center;
            border-bottom: 0;
            border-radius: 4px;
            display: block;
            color: rgb(34 34 34);
            i {
              font-size: 2px;
            }
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
    justify-content: center;
    margin-left: 20px;
    width: 80%;
    height: 100vh;
  }
`
const SearchContainer = styled.div`
  position: fixed;
  height: 80%;
  width: 50%;
  display: flex;

  z-index: 3;
  background-color: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0)
  );
  top: 10%;
  left: 27%;
  .box {
    width: 100%;
    background-color: rgba(253, 249, 249, 1);
    transition: background-color 1s ease-out;
    .box-search {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: 10%;
    }
    .box-result {
      width: 100%;
      height: 90%;
      .box-list {
        .box-a {
          display: flex;
          width: 100%;
          justify-content: flex-start;
          align-items: center;
          a {
            display: block;
            text-align: center;
            width: 100%;
            height: 100%;
          }
          a:visited {
            text-decoration: none;
          } /* visited link */
          a:hover {
            text-decoration: underline;
          } /* mouse over link */
          a:active {
            text-decoration: underline;
          }
        }
        h3 {
          width: 100%;
        }

        width: 100%;
        padding: 1em 2em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`

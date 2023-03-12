import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

function Layout() {
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
                  <a href="/">
                    <i></i>
                    首页
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i></i>标签
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i></i>分类
                  </a>
                </li>
                <li>
                  <a href="/">
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
          <aside className="aside">aside</aside>
        </div>
        <div className="right-Container">文章</div>
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
  padding: 0 50px;
  justify-content: space-between;

  .left-Container {
    width: 30%;
    padding: 1em 0;

    .header {
      display: block;
      background-color: #ffffff;
      width: 100%;
      height: 60%;
      .header-brand {
        display: flex;
        width: 100%;
        height: 40%;
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
      height: 40%;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
    }
  }
  .right-Container {
    display: flex;
    width: 70%;
    height: 100vh;
  }
`

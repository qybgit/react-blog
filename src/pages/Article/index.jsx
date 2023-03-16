import { marked } from 'marked'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useParams } from 'react-router-dom'
import { Button, Input } from 'antd'
function Article() {
  const { id } = useParams()
  const [article, setArticle] = useState()
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function Article() {
      const res = await http.post(`/article/${id}`)
      setArticle(res.data.data)
    }
    Article()
  }, [])
  console.log(article.content)
  // const content = marked(article.content)

  return (
    <>
      {article ? (
        <ArtcileCotainer>
          <div className="Page-block" key={article.id}>
            <header className="Page-header">
              <h2>
                <a>{article.title}</a>
              </h2>
              <div className="post-container">
                <div className="post-meta">
                  <span className="post-item">
                    发表时间：{article.createDate}
                  </span>
                  <span className="post-item">
                    更新于：{article.updateDate}
                  </span>
                  <span className="post-item">
                    分类于：{article.category.category_name}
                  </span>
                </div>
              </div>
            </header>
            <div className="Page-body">
              <p>
                <em>
                  <strong>BY Yuan Bo</strong>
                </em>
              </p>
              <p>{article.summary}</p>
            </div>
            <div className="content">{}</div>
            <footer className="Page-footer">
              <div></div>
            </footer>
          </div>
        </ArtcileCotainer>
      ) : (
        <div>加载中</div>
      )}
    </>
  )
}
export default Article
const ArtcileCotainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #fff;
  padding-top: 3em;
  .Page-block {
    display: block;
    .Page-header {
      text-align: center;
      margin-bottom: 60px;
      margin-top: 30px;
      a {
        width: 100%;
        font-size: 2rem;
        padding: 5px;
        color: #333;
      }
      a:link {
        text-decoration: none;
      } /* unvisited link */
      a:visited {
        text-decoration: none;
      } /* visited link */
      a:hover {
        text-decoration: underline;
      } /* mouse over link */
      a:active {
        text-decoration: underline;
      }
      .post-container {
        .post-meta {
          color: #999;
          font-family: Noto Serif SC, Noto Serif SC, 'PingFang SC',
            'Microsoft YaHei', sans-serif;
          font-size: 1em;
          margin-top: 3px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          height: 10%;
          .post-item {
            font-size: 1em;
            line-height: 2;
            padding: 5px;
          }
        }
      }
    }
    .Page-body {
      p {
        display: block;
        font-size: 1.25em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        margin: 0 0 20px;
        padding: 0 1em;
      }
      .button {
        margin-top: 50px;
        text-align: center;
        a {
          background: #fff;
          border: 1px solid #555;
          color: #555;
          display: inline-block;
          font-size: 1em;
          line-height: 2;
        }
      }
    }
    .Page-footer {
      display: flex;
      flex-direction: column;
      div {
        background: #ccc;
        height: 1px;
        margin: 80px auto 60px;
        width: 8%;
      }
    }
  }
`

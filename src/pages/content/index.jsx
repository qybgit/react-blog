import { http } from '@/utils'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { marked } from 'marked'
import ReactMarkdown from 'react-markdown'
import { Button, Input, Comment, List } from 'antd'
function Content() {
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')
  const [comments, setComment] = useState([])
  const { id } = useParams()
  useEffect(() => {
    async function ArticleList() {
      const res = await http.post(`/article/${id}`)
      setArticle(res.data.data)
      setIsLoading(false)
      setContent(res.data.data.articleBodyVo.content)
      setComment(res.data.data.commentVo)
    }
    ArticleList()
  }, [])
  console.log(comments)
  if (isLoading) {
    console.log('true')
    return <div>加载中</div>
  }
  const readerComments = (comments) => {
    ;<ArticleComment>
      {comments.map((comment) => {
        ;<Comment key={comment.id}></Comment>
      })}
    </ArticleComment>
  }

  return (
    <>
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
                <span className="post-item">更新于：{article.updateDate}</span>
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
          <div className="content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <footer className="Page-footer">
            <div></div>
          </footer>
        </div>
      </ArtcileCotainer>
    </>
  )
}
export default Content
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
    .content {
      font-size: 1.5em;
      text-align: justify;
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
const ArticleComment = styled.div`
  margin-top: 50px;
  background-color: #fff;
`

import { http } from '@/utils'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, InputNumber, Modal, message } from 'antd'
import ReactMarkdown from 'react-markdown'
import { values } from 'mobx'
//评论组件
function Comment({ comment, articleId }) {
  const [replying, setReolying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [compentE, setCommentE] = useState({}) //用来延迟加载评论
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()
  const commentParam = {
    content: '',
    article_id: articleId,
    parent_id: comment.id,
    level: 2,
  }
  useEffect(() => {
    setCommentE(comment)
    setIsLoading(false)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  if (isLoading) {
    return <div>评论加载中</div>
  } //延迟加载
  const onFinish = async (values) => {
    const token = localStorage.getItem('blog-key')
    if (token == null) {
      // setOpen(true)
      message.error('请登录后评论')
    } else {
      commentParam.content = values.text
      console.log(commentParam.content)
      const res = await http.post('/comment/add', commentParam)
      console.log(res.data)
      if (res.code == 200) {
        message.success('评论成功')
      } else {
        message.error(res.data.msg)
        if (res.data.code == 407) {
          localStorage.removeItem('blog-key')
        }
      }
    }
  } //表单提交
  const isShowModal = () => {}
  const handleCancel = () => {
    setOpen(false)
  }
  const handleOk = () => {
    form.submit()
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  } //
  const modalFinish = (values) => {
    console.log(values)
  }
  return (
    <div className="comment">
      <h4>{comment.toUser.nickName}</h4>
      <p>{comment.content}</p>
      <button onClick={() => setReolying(!replying)}>
        {replying ? '取消评论' : '评论'}
      </button>
      <div>
        {replying && (
          <Form
            name="nest-messages"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}>
            <Form.Item
              name="text"
              label="回复内容"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                回复
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
      <div>
        {/* <Modal
          title="登陆后才能评论哦"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <Form
            name="nest-messages"
            form={form}
            onFinish={modalFinish}
            style={{
              maxWidth: 600,
            }}>
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密 码"
              rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal> */}
      </div>
    </div>
  )
}

//根组件
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
  if (isLoading) {
    return <div>加载中</div>
  }
  const readerComments = (comment) => {
    return <ArticleComment></ArticleComment>
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
        <div>
          {comments ? (
            comments.map((comment) => (
              <Comment articleId={article.id} comment={comment}></Comment>
            ))
          ) : (
            <div>null</div>
          )}
          <div>comment</div>
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

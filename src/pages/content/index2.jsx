import { http } from '@/utils'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import { MessageOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Card,
  message,
  Space,
  Spin,
  List,
  Avatar,
} from 'antd'
import ReactMarkdown from 'react-markdown'
//评论组件
function CommentList({ comment, articleId }) {
  const [replying, setReolying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [commentE, setCommentE] = useState({}) //用来延迟加载评论
  const [form] = Form.useForm()
  const commentParam = {
    id: null,
    content: '',
    article_id: articleId,
    parent_id: comment.id,
    level: 2,
  }
  useEffect(() => {
    setCommentE(comment)
    setIsLoading(false)
  }, [])
  const commentName = comment.toUser.nickName
  if (isLoading) {
    return (
      <div>
        <Space>
          <Spin size="large"></Spin>
        </Space>
      </div>
    )
  } //延迟加载
  const onFinish = async (values) => {
    const token = localStorage.getItem('blog-key')
    if (token == null) {
      message.error('请登录后评论')
    } else {
      commentParam.content = values.text
      const res = await http.post('/comment/add', commentParam)
      if (res.data.code == 200) {
        message.success('评论成功')
        commentParam.id = res.data.data
      } else {
        message.error(res.data.msg)
        if (res.data.code == 407) {
          localStorage.removeItem('blog-key')
          window.location.reload() //页面刷新
        }
      }
    }
  } //表单提交
  return (
    <ListComment>
      <div className="comment">
        {/* <p>{comment.content}</p> */}
        <button
          onClick={() => setReolying(!replying)}
          style={{ border: 'none', paddingLeft: 3 }}>
          {replying ? (
            <div>
              <MessageOutlined style={{}}></MessageOutlined>
              <div> 取消评论</div>
            </div>
          ) : (
            <div>
              <MessageOutlined style={{}}></MessageOutlined>
              <div> 评论</div>
            </div>
          )}
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
                label={`回复${comment.toUser.nickName}`}
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                style={{
                  paddingLeft: 10,
                }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#fbf7fb87F',
                    color: '#333',
                  }}>
                  发布
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
        <div>
          {comment.children && comment.children.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={comment.children}
              split={true}
              renderItem={(comment, index) => {
                return (
                  <>
                    <CommentFlex>
                      <div>
                        <Avatar
                          src={`https://joesch.moe/api/v1/random?key=${index}`}
                          alt="avatar"
                          size="large"
                          gap={8}></Avatar>
                      </div>
                      <div>
                        <div className="huifu">
                          <h3>{comment.toUser.nickName}</h3>
                          <>
                            {commentName ? (
                              <div className="span">
                                <span style={{ color: '#8a919f' }}>回复</span>
                                <h3>{commentName}</h3>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        </div>
                        <div>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    </CommentFlex>{' '}
                    <Size>
                      <CommentList
                        articleId={articleId}
                        comment={comment}></CommentList>
                    </Size>
                  </>
                )
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </ListComment>
  )
}

//根组件
function Content() {
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState('')
  const [comments, setComment] = useState([])
  const [test, setTest] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    async function ArticleList() {
      const res = await http.post(`/article/${id}`)
      console.log(res.data)
      setArticle(res.data.data)
      setIsLoading(false)
      setContent(res.data.data.articleBodyVo.content)
      setComment(res.data.data.commentVo)
    }
    ArticleList()
    return () => {
      setArticle({})
      setComment([])
      setContent('')
    }
  }, [])
  if (isLoading) {
    return (
      <div>
        <Space>
          <Spin size="large"></Spin>
        </Space>
      </div>
    )
  }

  return (
    <>
      <ArtcileCotainer>
        <div className="box">
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
            //文章内容
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
          {comments && comments.length > 0 ? (
            <div className="List" style={{ padding: 3 }}>
              <Card>
                <List
                  itemLayout="horizontal"
                  dataSource={comments} //根评论
                  split={true} //分页线
                  renderItem={(comment, index) => {
                    return (
                      <>
                        <CommentFlex>
                          <div className="left">
                            <Avatar
                              src={`https://joesch.moe/api/v1/random?key=${index}`}
                              alt="avatar"
                              size="large"
                              gap={8}></Avatar>
                          </div>

                          <div className="right">
                            <div>
                              <h3>{comment.toUser.nickName}</h3>
                            </div>
                            <div>
                              <p>{comment.content}</p>
                            </div>
                          </div>
                        </CommentFlex>
                        <Sizes>
                          <CommentList
                            articleId={article.id}
                            comment={comment}></CommentList>
                        </Sizes>
                      </>
                    )
                  }}
                />
              </Card>
            </div>
          ) : (
            <Card>
              <div>还没有评论，快来评论吧！</div>
            </Card>
          )}
        </div>
      </ArtcileCotainer>
    </>
  )
}
export default Content
const ArtcileCotainer = styled.div`
  .box::-webkit-scrollbar-thumb {
    background: #ccc; // 滑块颜色
    border-radius: 5px; // 滑块圆角
  }
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
const Size = styled.div`
  font-size: 1em;
`
const Sizes = styled.div`
  padding: 0 3em;
  font-size: 1em;
  background-color: '#EFEFEF';
`
const ListComment = styled.div`
  background-color: #f7f8fab3;
`
const CommentFlex = styled.div`
  display: flex;

  align-items: center;
  .huifu {
    font-size: 15px;
    display: flex;
    align-items: center;
    h3 {
      padding: 0.5em;
    }
    .span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

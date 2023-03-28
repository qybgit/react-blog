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
  Divider,
  Tag,
  Empty,
} from 'antd'
import ReactMarkdown from 'react-markdown'
import { set } from 'mobx'
//评论组件
function CommentList({ comment, articleId }) {
  const [replying, setReolying] = useState(false)
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
    return () => {
      setCommentE({})
      setIsLoading(null)
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
  } //延迟加载
  const commentName = commentE.toUser.nickName
  const onFinish = async (values) => {
    const token = localStorage.getItem('blog-key')
    if (token == null) {
      message.error('请登录后评论')
    } else {
      commentParam.content = values.text
      const res = await http.post('/comment/add', commentParam)
      if (res.data.code == 200) {
        message.success('评论成功')
        window.location.reload()
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
        <div className="listButton">
          <button
            onClick={() => setReolying(!replying)}
            style={{ border: 'none', paddingLeft: 3 }}>
            {replying ? (
              <div>
                <MessageOutlined style={{}}></MessageOutlined>
                <div style={{ fontSize: 0.8 }}> 取消</div>
              </div>
            ) : (
              <div>
                <MessageOutlined style={{}}></MessageOutlined>
                <div> </div>
              </div>
            )}
          </button>
        </div>

        <div>
          {replying && (
            <Form
              name="nest-messages"
              onFinish={onFinish}
              style={{
                maxWidth: 800,
              }}>
              <Form.Item
                name="text"
                label={`回复${comment.toUser.nickName}`}
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input.TextArea className="my-input" />
              </Form.Item>
              <Form.Item
                style={{
                  paddingLeft: 10,
                }}>
                <div className="pushButton">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      margin: '1em 0',
                      backgroundColor: '#555',
                    }}>
                    发布
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </div>
        <div>
          {commentE.children && commentE.children.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={commentE.children}
              split={true}
              renderItem={(comment, index) => {
                return (
                  <>
                    <CommentFlex>
                      <div>
                        <Avatar alt="avatar" size="large" gap={8}>
                          {comment.toUser.nickName}
                        </Avatar>
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
//根评论
function CommentOneContainer({ articleId }) {
  const [replying, setRepying] = useState(false)
  const commentParam = {
    content: '',
    article_id: articleId,
    parent_id: 0,
    level: 1,
  }
  const onFinish = async (values) => {
    const token = localStorage.getItem('blog-key')
    if (token == null) {
      message.error('请登录后评论')
    } else {
      commentParam.content = values.text
      const res = await http.post('/comment/add', commentParam)
      if (res.data.code == 200) {
        message.success('评论成功')
        window.location.reload()
      } else {
        message.error(res.data.msg)
        if (res.data.code == 407) {
          localStorage.removeItem('blog-key')
          window.location.reload() //页面刷新
        }
      }
    }
  } //表单提交
  const handleChange = (e) => {
    setRepying(e)
  }
  const handleClickChange = () => {
    setRepying()
  }
  const username = () => {
    const token = localStorage.getItem('blog-key')
    if (!token) {
      return (
        <>
          {' '}
          <div className="left">
            <Avatar
              src={`https://joesch.moe/api/v1/random?key=1}`}
              alt="avatar"
              size="large"
              gap={8}></Avatar>
          </div>
          <div className="right">
            <div>
              <h3>{'未登录'}</h3>
            </div>
          </div>
        </>
      )
    } else {
      const { account } = JSON.parse(token)
      return (
        <>
          <div className="left">
            <Avatar
              src={`https://joesch.moe/api/v1/random?key=1}`}
              alt="avatar"
              size="large"
              gap={8}>
              {account}
            </Avatar>
          </div>
          <div className="right">
            <div>
              <h3>{account}</h3>
            </div>
          </div>
        </>
      )
    }
  }
  return (
    <CommentOne>
      <div className="box">
        <Card
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: ' #f7f8fab3',
          }}>
          <div className="box-from">
            <div className="box-left">
              {' '}
              <CommentFlexPush>{username()}</CommentFlexPush>
            </div>
            <div className="box-right">
              <Form
                name="nest-messages"
                onClick={() => handleChange(true)}
                onFinish={onFinish}
                style={{
                  padding: '1em 3em',
                }}>
                <Form.Item
                  name="text"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Input.TextArea
                    onFocus={() => handleChange(true)}
                    placeholder="输入评论"
                  />
                </Form.Item>
                {replying ? (
                  <div className="box-push">
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: '#555',
                        width: '5em',
                      }}>
                      发布
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </CommentOne>
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

            <div className="page-body">
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

            <footer className="page-footer">
              <div></div>
            </footer>
            <div className="page-tags">
              <Space style={{ fontSize: 20 }}>
                <div>分类:</div>
                <div>
                  <Tag
                    color="orange"
                    style={{ fontSize: '18px', padding: '8px' }}>
                    {article.category.category_name}
                  </Tag>
                </div>
              </Space>
              <Space style={{ fontSize: 18 }}>
                <div>标签：</div>
                {article.tags && article.tags.length > 0 ? (
                  <div>
                    {article.tags.map((tag) => (
                      <Tag
                        color="orange"
                        style={{ fontSize: '18px', padding: '8px' }}>
                        {tag.tag_Name}
                      </Tag>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </Space>
            </div>
          </div>
          <div className="List-one">
            <CommentOneContainer articleId={article.id}></CommentOneContainer>
          </div>
          {comments && comments.length > 0 ? (
            <div className="List" style={{ padding: 3 }}>
              <Divider orientation="left" style={{}}>
                <h2>评论</h2>
              </Divider>

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
                              gap={8}>
                              {comment.toUser.nickName}
                            </Avatar>
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
            <>
              <Divider orientation="left" style={{ padding: 3 }}>
                <h2>评论</h2>
              </Divider>
              <Card>
                <Empty description="还没有评论，快来评论吧！"></Empty>
              </Card>
            </>
          )}
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
    .page-body {
      p {
        display: block;
        font-size: 1.25em;

        margin-inline-start: 0px;
        margin-inline-end: 0px;
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
      padding: 2em;
    }
    .page-tags {
      font-size: 15px;
      padding: 3em;
    }
    .page-footer {
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
  .comment {
    .listButton {
      padding-right: -1;
    }

    .pushButton {
      display: flex;
      justify-content: flex-end;
    }
  }
`
const CommentFlex = styled.div`
  display: flex;
  .left {
  }
  .right {
    padding-left: 1em;
    padding-top: 2em;
  }
  align-items: center;
  .huifu {
    font-size: 15px;
    display: flex;
    align-items: center;
    h3 {
      padding: 0 0.5em;
    }
    .span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
const CommentOne = styled.div`
  .box {
    .box-from {
      .box-right {
        .box-push {
          display: flex;
          justify-content: flex-end;
          padding-right: 3em;
        }
      }
    }
  }
`
const CommentFlexPush = styled.div`
  display: flex;
  justify-content: flex-start;
  .right {
    padding-left: 1em;
  }
`

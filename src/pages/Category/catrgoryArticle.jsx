import { http } from '@/utils'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { Card, List, Divider, Spin, Empty } from 'antd'

import styled from 'styled-components'

function CategoryArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function findArticle() {
      const res = await http.post(`/category/${id}`)
      if (res.data.code == -1) {
        navigate('/error')
      }
      setArticles(res.data.data)
      setIsLoading(false)
    }
    findArticle()
    return () => {
      setArticles([])
      setIsLoading(false)
    }
  }, [])
  if (isLoading) {
    return (
      <>
        <Spin></Spin>
      </>
    )
  }
  return (
    <>
      <Container>
        {articles && articles.length > 0 ? (
          <Card style={{ width: '100%', height: '100%' }}>
            <div className="box">
              <div>
                <Divider style={{ fontSize: '2em' }}>
                  {articles ? articles[0].category.category_name : null}
                </Divider>
              </div>{' '}
              <div>
                <List
                  dataSource={articles}
                  itemLayout="vertical"
                  renderItem={(article) => (
                    <List.Item style={{ color: '#555' }}>
                      <List.Item.Meta
                        description={article.createDate}></List.Item.Meta>
                      <Link to={`/article/${article.id}`}>
                        <span className="box-span">
                          <a style={{ color: '#555' }}>{article.title}</a>
                        </span>
                      </Link>
                    </List.Item>
                  )}></List>
              </div>
            </div>
          </Card>
        ) : (
          <div className="box-empty">
            <Card style={{ width: '100%', height: '100%' }}>
              <Empty style={{ paddingTop: '20%' }}></Empty>
            </Card>
          </div>
        )}
      </Container>
    </>
  )
}
export default CategoryArticle
const Container = styled.div`
  overflow: scroll;
  width: 100vw;
  height: 100vh;
  .box-empty {
    padding: 2em;
    width: 100%;
    height: 100%;
  }
  .box {
    padding: 0 3em;
    .box-span {
      color: '#555';
      font-size: 2em;
    }
    a {
      text-align: center;
      width: 5em;
      height: 100%;
      color: '#555';
    }
    a:link {
      text-decoration: underline;
    }
    a:visited {
      text-decoration: underline;
    } /* visited link */
    a:hover {
      text-decoration: underline;
    } /* mouse over link */
    a:active {
      text-decoration: underline;
    }
  }
`

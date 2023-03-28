import React, { useEffect, useState } from 'react'
import { http } from '@/utils/index'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function ArticleList() {
  const [articles, setArticle] = useState([])
  const [count, setcount] = useState(0)
  const [params, setParams] = useState({
    page: 1,
    pageSize: 5,
  })
  useEffect(() => {
    async function ArticleList() {
      const res = await http.post('/article/alls', {
        params,
      })
      const c = await http.get('/article/count')
      setcount(c.data.data)
      setArticle(res.data.data)
    }
    ArticleList()
    return () => {
      setArticle([])
      setcount(null)
    }
  }, [params])

  const pageCount = Math.ceil(count / params.pageSize)
  const pagesVisited = (params.page - 1) * params.pageSize
  const changePage = ({ selected }) => {
    setParams({ ...params, page: selected + 1 })
  }
  return (
    <>
      <ReactPage>
        <div className="Page-main">
          {articles
            .slice(pagesVisited, pagesVisited + params.pageSize)
            .map((article) => (
              <div className="Page-block" key={article.id}>
                <header className="Page-header">
                  <h2>
                    <Link to={`/article/${article.id}`}>
                      <a>{article.title}</a>
                    </Link>
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
                  <div className="button">
                    <Link to={`/article/${article.id}`}>
                      <a>阅读全文 »</a>
                    </Link>
                  </div>
                </div>
                <footer className="Page-footer">
                  <div></div>
                </footer>
              </div>
            ))}
        </div>
        <div className="Page-paginte">
          <ReactPaginate
            style={{ padding: '20px' }}
            previousLabel={'上一页'}
            nextLabel={'下一页'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
          />
        </div>
      </ReactPage>
    </>
  )
}
export default ArticleList
const ReactPage = styled.div`
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
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .pagination__link {
    padding: 0.5rem 0.8rem;
    margin: 0 0.2rem;
    border-radius: 0.25rem;
    color: #333;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .pagination__link--active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }

  .pagination__link--disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  .Page-paginte {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      margin: 0 10px;
      a {
        color: #333;
        text-decoration: none;
        padding: 0 1em;
        border-radius: 5px;
      }
      a:hover {
        /* background-color: #555; */
      }
    }
  }
`

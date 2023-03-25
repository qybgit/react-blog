import { http } from '@/utils'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, Card } from 'antd'
import { Link } from 'react-router-dom'
function Category() {
  const [categorys, setCategory] = useState([])
  const navigate = useNavigate()
  const [alink, setAlink] = useState('')
  useEffect(() => {
    async function category() {
      const res = await http.get('/category/all')
      console.log(res.data)
      if (res.data.code == -1) {
        navigate('/error')
      }
      setCategory(res.data.data)
    }
    category()
    return () => {
      setCategory([])
    }
  }, [])
  const handleHover = (alink) => {
    setAlink(alink)
  }
  const handleMove = () => {
    setAlink('')
  }
  return (
    <>
      <CategoryCotainer>
        <Card style={{ width: '100%', height: '100%' }}>
          <div className="box">
            <div>
              <Divider style={{ fontSize: '2em' }}>Cateegory</Divider>
            </div>
            <div className="count">
              <h3>{`目前总计为 ${
                categorys ? categorys.length : null
              } 个标签`}</h3>
            </div>

            <div className="box-category">
              {categorys && categorys.length > 0 ? (
                <>
                  {categorys.map((category) => (
                    <div>
                      <Link to={`/category/${category.id}`}>
                        <span>
                          <a
                            style={{
                              color:
                                alink === category.category_name
                                  ? 'orange'
                                  : '#D46B08',
                              fontSize:
                                alink === category.category_name
                                  ? '30px'
                                  : '20px',
                              transition: 'font-size 0.2s ease-in-out',
                            }}
                            onMouseEnter={() =>
                              handleHover(category.category_name)
                            }
                            onMouseLeave={() =>
                              handleMove()
                            }>{`${category.category_name}(${category.count})`}</a>
                        </span>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <>null</>
              )}
            </div>
          </div>
        </Card>
      </CategoryCotainer>
    </>
  )
}
export default Category
const CategoryCotainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #fff;
  padding-top: 3em;
  .box {
    .count {
      text-align: center;
      padding: 2;
    }
    .box-category {
      width: 100;
      height: 100%;

      div {
        span {
          display: block;
          padding: 2em 5em;
          width: 100%;
          height: 100%;
          line-height: 2;
          a {
            display: block;
            text-align: center;
            width: 5em;
            height: 100%;
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
        width: 100%;
        height: 5%;
      }
    }
  }
`

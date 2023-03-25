import React, { useEffect, useState } from 'react'
import { http } from '@/utils'
import styled from 'styled-components'
import { Select, Divider, Empty, Card } from 'antd'
import { Link, NavLink } from 'react-router-dom'
function Tag() {
  const [tags, setTags] = useState([])
  const [alink, setAlink] = useState('')
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function tag() {
      const res = await http.get('/tag/all')
      setTags(res.data.data)
    }
    async function count() {
      const res = await http.get('/tag/count')

      setCount(res.data.data)
    }
    tag()
    count()
    return () => {
      setTags([])
      setCount(null)
    }
  }, [])
  const handleChange = (value) => {
    console.log(value)
  }
  const handleHover = (alink) => {
    setAlink(alink)
  }
  const handleMove = () => {
    setAlink('')
  }
  return (
    <>
      <TagCotainer>
        <Card style={{ width: '100%', height: '100%' }}>
          <div className="box">
            <div>
              <Divider style={{ fontSize: '2em' }}>Tags</Divider>
            </div>
            <div className="count">
              <h3>{`目前总计为 ${
                tags && tags.length > 0 ? count : null
              } 个标签`}</h3>
            </div>

            <div className="box-tag">
              {tags && tags.length > 0 ? (
                <>
                  {tags.map((tag) => (
                    <div className="tag">
                      <span>
                        <NavLink to={`/tag/${tag.id}`}>
                          <a
                            style={{
                              color:
                                alink === tag.tag_Name ? 'orange' : '#D46B08',
                              fontSize:
                                alink === tag.tag_Name ? '30px' : '20px',
                              transition: 'font-size 0.2s ease-in-out',
                            }}
                            onMouseEnter={() => handleHover(tag.tag_Name)}
                            onMouseLeave={() => handleMove()}>
                            {`${tag.tag_Name}(${tag.count})`}
                          </a>
                        </NavLink>
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card>
      </TagCotainer>
    </>
  )
}
export default Tag
const TagCotainer = styled.div`
  width: 100%;
  height: 100%;

  background-color: #fff;
  padding-top: 3em;
  .box {
    .count {
      text-align: center;
      padding: 2;
    }
    .box-tag {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      height: 100%;

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
    }
  }
`
const Tes = styled.div`
  .react-tag-clound {
    li {
      a {
        color: #000;
        &:hover {
          color: #fff;
          background-color: #000;
        }
      }
    }
  }
`

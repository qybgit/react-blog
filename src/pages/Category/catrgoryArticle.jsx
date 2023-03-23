import { http } from '@/utils'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Timeline } from 'antd'

function CategoryArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  useEffect(() => {
    async function findArticle() {
      const res = await http.post(`/category/${id}`)
      if (res.data.code == -1) {
        navigate('/error')
      }
      setArticles(res.data.data)
    }
    findArticle()
    return () => {
      setArticles([])
    }
  }, [])
  console.log(articles)
  return (
    <>
      <Timeline items={articles}></Timeline>
    </>
  )
}
export default CategoryArticle

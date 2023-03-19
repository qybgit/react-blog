import { http } from '@/utils'
import React, { useState, useEffect } from 'react'

function Test() {
  const commentParam = {
    content: 'ddddd',
    article_id: 1,
    parent_id: 0,
    level: 1,
  }
  const test = async () => {
    const res = await http.post('/comment/add', commentParam)
    console.log(res.data)
  }
  return (
    <>
      <button onClick={test}>test</button>
    </>
  )
}

export default Test

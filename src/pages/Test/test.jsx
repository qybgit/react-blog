import { http } from '@/utils'
import React, { useState, useEffect } from 'react'

function Test() {
  const commentParam = {
    content: 'ddddd',
    article_id: 1,
    parent_id: 0,
    level: 2,
  }
  const test = async () => {
    const res = await http.post('/article/1')
    console.log(res.data)
  }
  const A = []
  return (
    <>
      {A ? <div>true</div> : <div>false</div>}
      <button onClick={test}>test</button>
    </>
  )
}

export default Test

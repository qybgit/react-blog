import { http } from '@/utils'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Test() {
  const [a, setA] = useState(0)

  const handleHover = () => {
    setA(1)
    console.log(a)
    // setAlink(alink)
  }
  const handleMove = () => {
    setA(0)
    console.log(a)
  }
  const A = []
  return (
    <>
      <Box>
        <a
          className="a"
          style={{
            color: 'red',
            fontSize: a === 1 ? 50 : 30,
          }}
          onMouseEnter={() => handleHover()}
          onMouseLeave={() => handleMove()}>
          java
        </a>
      </Box>
    </>
  )
}

export default Test
const Box = styled.div`
  .a {
  }
  a:hover {
  }
`

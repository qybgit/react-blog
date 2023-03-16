import React, { useEffect, useState } from 'react'
import { http } from '@/utils'
function Tag() {
  useEffect(() => {
    async function tag() {
      const res = await http.get('/tag/1')
    }
    tag()
  }, [])
  return <div>Tag</div>
}
export default Tag

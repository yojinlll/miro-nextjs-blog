import React from 'react'
import Link from 'next/link'
import nextjpg from "assets/images/next.jpg"

export default function FirstPost(){
  return (
    <div>
      <h1>post test</h1>
      <Link href="/">home</Link>
      <img src={nextjpg} />
    </div>
  )
}
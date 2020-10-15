import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { usePosts } from "hooks/usePosts";
import { getPosts } from "lib/posts";

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  console.log(props)
  // const {posts, isLoading, isEmpty} = usePosts()

  return (
    <div>
      <h1>posts index</h1>
      {
        // isLoading ? 'loading' :
        <div>
          {
            // isEmpty ? "没有数据" :
            props.posts.map(i => {
              return (
                <div key={i.id}>
                  {i.title}
                  <div>{i.content}</div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default PostsIndex

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props:{
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
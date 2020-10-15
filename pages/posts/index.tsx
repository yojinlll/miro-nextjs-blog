import React, { useEffect, useState } from "react";
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { usePosts } from "hooks/usePosts";
import { getPosts } from "lib/posts";

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
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
                  {/* <Link href={`/posts/${i.id}`}> */}
                  <Link href="/posts/[id]" as={`/posts/${i.id}`}>
                    <a>{i.title}</a>
                  </Link>
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props:{
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
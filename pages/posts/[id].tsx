import { getPost, getPostIds } from "lib/posts"
import { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import React from "react"

type Props = {
  post: Post
}

const PostsShow: NextPage<Props> = (props) => {
  return (
    <div>
      <button>
        <Link href={'/posts'}>go back</Link>
      </button>
      <h1>markdown</h1>
      <article dangerouslySetInnerHTML={ {__html: props.post.htmlContent} } />
    </div>
  )
}

export default PostsShow

export const getStaticPaths = async () => {
  const idList = await getPostIds()
  return {
    paths: idList.map(id => ({ params: { id }}) ),
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async (context: any) => {
  const post = await getPost(context.params.id)
  return {
    props: {
      post: post
    }
  }
}
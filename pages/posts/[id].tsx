import { getDatabaseConnection } from "lib/getDatabaseConnection"
import { getPost, getPostIds } from "lib/posts"
import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import Link from "next/link"
import React from "react"
import { Post } from "src/entity/Post"

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
      <article dangerouslySetInnerHTML={ {__html: props.post.content} } />
    </div>
  )
}

export default PostsShow


// SSR, 数据库获取数据
export const getServerSideProps: GetServerSideProps<any, {id: string}> = async (context) => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, context.params.id)
  
  
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}

// SSG, 静态渲染，先定义路由
// export const getStaticPaths = async () => {
//   const idList = await getPostIds()
//   return {
//     paths: idList.map(id => ({ params: { id }}) ),
//     fallback: false
//   }
// }

// 本地获取数据
// export const getStaticProps: GetStaticProps = async (context: any) => {
//   const post = await getPost(context.params.id)
//   return {
//     props: {
//       post: post
//     }
//   }
// }
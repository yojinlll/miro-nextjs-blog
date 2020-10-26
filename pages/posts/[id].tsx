import { getDatabaseConnection } from "lib/getDatabaseConnection"
import { getPost, getPostIds } from "lib/posts"
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, NextPage } from "next"
import Link from "next/link"
import React from "react"
import { Post } from "src/entity/Post"
import marked from "marked"
import { Button } from "components"
import { withSession } from "lib/withSession"
import { User } from "src/entity/User"

type Props = {
  post: Post
  currentUser: User
  isPostAuthor: boolean
}

const PostsShow: NextPage<Props> = (props) => {
  const { post, currentUser, isPostAuthor } = props

  return (
    <>
      <div className="wrapper">
        <header className="title flex">
          <h1>{post.title}</h1>
          
          { isPostAuthor && <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>
            <Button>edit</Button>
          </a></Link>}
        </header>
        <article className="content" dangerouslySetInnerHTML={ {__html: marked(post.content)} } />
      </div>

      <style jsx>{`
        .wrapper{
          max-width: 800px;
          margin: 0 auto 24px;
          padding: 0 16px;
        }
        .title{
          border-bottom: 1px solid #ddd;
          padding-bottom: 16px;
        }
        .content{
          margin-top: 42px;
        }
      `}</style>
    </>
  )
}

export default PostsShow


// SSR, 数据库获取数据
export const getServerSideProps: GetServerSideProps<any, {id: string}> = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const currentUser = JSON.parse(context.req.session.get('currentUser') || null)

  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, context.params.id.toString())
  const _post = JSON.parse(JSON.stringify(post))
  
  return {
    props: {
      post: _post,
      currentUser,
      isPostAuthor: _post.authorId === currentUser.id
    }
  }
})

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
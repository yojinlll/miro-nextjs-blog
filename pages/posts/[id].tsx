import { getDatabaseConnection } from "lib/getDatabaseConnection"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import Link from "next/link"
import React, { useCallback } from "react"
import { Post } from "src/entity/Post"
import marked from "marked"
import { Button } from "components"
import { withSession } from "lib/withSession"
import { User } from "src/entity/User"
import axios from "axios";
import Router from "next/router"
import { useRedirect } from "hooks/useRedirect"
import { dateFormat } from "lib/utils"

type Props = {
  id: number
  post: Post
  currentUser: User
}

const PostsShow: NextPage<Props> = (props) => {
  const { id, post, currentUser } = props
  const onDeletePost = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`)
      .then(() => {
        alert('done!')
        Router.push("/posts")
      })
      .catch(() => {
        alert('error!')
      })
  }, [id])

  useRedirect(currentUser, post)

  return (
    <>
      { post &&
        <div className="post-wrapper">
          <header className="title">
            <div className="actions-wrap">
              <Button onClick={()=>Router.push("/posts")}>Back</Button>

              <div className="actions">
                <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>
                  <Button>Edit</Button>
                </a></Link>
                <Button onClick={onDeletePost}>Delete</Button>
              </div>
            </div>
            <h1>{post.title}</h1>
          </header>
          <article className="content" dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
          <div className="update">{dateFormat(post.updatedAt.toString())}</div>
        </div>
      }

      <style jsx>{`
        .post-wrapper{
          max-width: 800px;
          margin: 0 auto;
          padding: 12px 16px 24px;
        }
        .title{
          border-bottom: 1px solid #ddd;
          padding-bottom: 16px;
        }
        .title > h1{ 
          margin-bottom: 0;
          word-break: break-all;
        }
        .content{
          margin-top: 42px;
          word-break: break-all;
          min-height: 300px;
        }
        .update{
          text-align: end;
        }
        .actions-wrap{
          display: flex;
          justify-content: space-between;
        }
        .actions{
          display: inline-block;
        }
        .actions > a:first-child{
          margin-right: 12px
        }
      `}</style>
    </>
  )
}

export default PostsShow


// SSR, 数据库获取数据
export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const currentUser = JSON.parse(context.req.session.get('currentUser') || null)

  const id = context.params.id.toString()
  const connection = await getDatabaseConnection()
  const post = await connection.getRepository(Post).findOne({ where: { authorId: currentUser?.id, id } })
  const _post = JSON.parse(JSON.stringify(post || null))

  return {
    props: {
      id: parseInt(id),
      post: _post,
      currentUser,
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
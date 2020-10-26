import { getDatabaseConnection } from "lib/getDatabaseConnection"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import Link from "next/link"
import React, { useCallback, useEffect } from "react"
import { Post } from "src/entity/Post"
import marked from "marked"
import { Button } from "components"
import { withSession } from "lib/withSession"
import { User } from "src/entity/User"
import axios from "axios";
import Router from "next/router"

type Props = {
  id: number
  post: Post
  currentUser: User
}

const PostsShow: NextPage<Props> = (props) => {
  const { id, post, currentUser } = props
  const onDeletePost = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`)
      .then(res => {
        alert('done!')
        Router.push("/posts")
      })
      .catch(err => {
        alert('error!')
      })
  }, [id])

  useEffect(() => {
    !post && Router.push("/404")
  }, [post])

  return (
    <>
      {
        post && <div className="wrapper">
          <header className="title flex">
            <h1>{post.title}</h1>

            {currentUser && (
              <div className="actions">
                <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>
                  <Button>Edit</Button>
                </a></Link>
                <Button onClick={onDeletePost}>Delete</Button>
              </div>
            )}
          </header>
          <article className="content" dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        </div>
      }

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
  const post = await connection.manager.findOne(Post, id)
  const _post = JSON.parse(JSON.stringify(post) || null)

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
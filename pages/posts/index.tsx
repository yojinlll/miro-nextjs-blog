import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import { Button } from "components"
import qs from "querystring"
import { usePager } from "hooks/usePager";
import { withSession } from "lib/withSession";
import { User } from "src/entity/User";
import { useRedirect } from "hooks/useRedirect";
import { dateFormat } from "lib/utils";
import axios from "axios";
import React, { useState } from "react"
import Router from "next/router"

type Props = {
  posts: Post[],
  count: number
  perPage: number
  page: number
  totalPage: number
  currentUser: User | null
}

const PostsIndex: NextPage<Props> = (props) => {
  const { currentUser } = props
  const { pager } = usePager(props)
  const [isMaskOpen, setMask] = useState(false)

  const maskToggle = () => {
    setMask(!isMaskOpen)
  }

  const logout = ()=>{
    axios.get('/api/v1/logout').then(res => {
      Router.push('/')
    }).catch(err => {})
  }

  useRedirect(currentUser)

  return (
    <div className="posts">
      <header className="posts-header flex">
        <div></div>

        <div className="menu" onClick={maskToggle}>
          <div className="flex" style={{transform: 'translateY(8px)'}}>
            <span className={`close-bar ${isMaskOpen ? "is-open" : ""}`}></span>
            <span className={`close-bar ${isMaskOpen ? "is-open" : ""}`}></span>
          </div>
          <div style={{overflow: 'hidden'}}>
            <div className={`decorate-line ${isMaskOpen ? "is-close" : ""}`} />
            <div className={`decorate-line ${isMaskOpen ? "is-close" : ""}`} />
            <div className={`decorate-line ${isMaskOpen ? "is-close" : ""}`} />
          </div>
        </div>

        <div>
          <Link href="/posts/new"><a>
            <Button>Add</Button>
          </a></Link>
          <Button style={{ marginLeft: 6 }} onClick={() => {
            window.location.search.includes('DESC')
              ? window.location.href = "/posts"
              : window.location.href = "/posts?order=DESC"
          }}>Sort</Button>
        </div>
      </header>

      <main className="posts-list">
        {
          props.posts.map(i => {
            return (
              <Link href="/posts/[id]" as={`/posts/${i.id}`} key={i.id}>
                <a className="post-item flex">
                  <span className="title">· {i.title}</span>

                  <span className="update">{dateFormat(i.updatedAt.toString())}</span>
                </a>
              </Link>
            )
          })
        }
      </main>
      <footer style={{ marginTop: 24 }}>
        {pager}
      </footer>

      <div className={`mask-nav ${isMaskOpen ? "is-mask-open" : ""}`}>
        <div className="menu-wrap">
          <Link href="/"><a>
            <h1>Mironote</h1>
          </a></Link>
          <h2>Hello, {currentUser.username}</h2>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>

      <style jsx>{`
        .posts{
          width: 90vw;
          max-width: 800px;
          max-height: 800px;
          margin: 0 auto;
        }
        .posts-header{
          padding:24px 0;
          min-height: 80px;
        }
        .posts-header h1{
          font-size: 24px;
        }
        .post-item{
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
          justify-content: space-between;
        }
        .post-item .title{
          font-size: 14px;
          width: 185px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .post-item .update{
          font-size: 12px;
          min-width: 120px;
        }
        .post-item:hover{
          color: #c39c5a; cursor: pointer;
        }
        .posts-list{
          min-height: 65vh;
        }
        .menu{
          z-index: 2;
          cursor: pointer;
          color: #fff;
          position: absolute;
        }
        .menu-wrap{
          max-width: 800px;
          max-height: 800px;
          margin: 0 auto;
          padding: 120px 24px 0;
          text-align: center;
          font-family: Cardo,serif;
        }
        .menu-wrap h1{
          font-size: 60px;
          font-weight: 400;
          margin-bottom: 12px;
          color: #fff;
          cursor: pointer;
        }
        .menu-wrap h2{
          color: #fff;
          font-weight: 400;
        }
        .menu .decorate-line{
          transition: transform .2s cubic-bezier(.77,0,.175,1);
          transform-origin: 0 50%;
          background: #696969;
        }
        .menu .decorate-line{
          height: 2px;
          width: 20px;
          margin-bottom: 4px;
        }
        .menu .decorate-line.is-close{
          transform: translateX(-100%);
        }
        .menu .decorate-line:last-child{
          margin: 0;
        }
        .mask-nav.is-mask-open{
          transform: translateY(0);
        }
        .mask-nav{
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          height: 100vh;
          overflow: hidden;
          background: #7a9586;
          transform: translateY(-100%);
          transition: transform .8s cubic-bezier(.77,0,.175,1);
        }
        .menu .close-bar{
          width: 20px;
          height: 2px;
          background:#fff;
          transition: transform .5s cubic-bezier(.77,0,.175,1);
        }
        .menu .close-bar:first-child{
          transform: rotate(-45deg) scaleX(0);
        }
        .menu .close-bar.is-open:first-child{
          transform: rotate(-45deg) scaleX(1);
          transition-delay: .26s;
        }
        .menu .close-bar:last-child{
          transform: rotate(45deg) scaleX(0);
          position: absolute;
        }
        .menu .close-bar.is-open:last-child{
          transform: rotate(45deg) scaleX(1);
          transition-delay: .2s;
        }
      `}</style>
      <style jsx global>{`
        .menu-wrap .miro-button{
          padding-left: 2.75rem;
          padding-right: 2.75rem;
        }\
      `}</style>
    </div>
  )
}

export default PostsIndex

// 数据库获取数据
export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const currentUser = JSON.parse(context.req.session.get('currentUser') || null)

  // 分页设置
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index + 1)
  const query = qs.parse(search)
  const page = parseInt(query.page?.toString() || '1')
  const perPage = 12

  const connection = await getDatabaseConnection()
  const [posts, count] = await connection.getRepository(Post).findAndCount({
    where: { authorId: currentUser?.id },
    order: query.order && { updatedAt: "DESC" },
    skip: (page - 1) * perPage,
    take: perPage
  })

  return {
    props: {
      currentUser,
      posts: JSON.parse(JSON.stringify(posts)),
      count: count - 1,
      perPage,
      page,
      totalPage: Math.ceil((count - 1) / perPage)
    }
  }
})

// 本地获取数据
// export const getStaticProps: GetStaticProps = async () => {
//   const posts = await getPosts()
//   return {
//     props:{
//       posts: JSON.parse(JSON.stringify(posts))
//     }
//   }
// }
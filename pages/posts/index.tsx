import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import { Button } from "components"
import qs from "querystring"
import { usePager } from "hooks/usePager";

type Props = {
  posts: Post[],
  count: number
  perPage: number
  page: number
  totalPage: number
}

const PostsIndex: NextPage<Props> = (props) => {
  const { pager } = usePager(props)
  return (
    <div className="posts">
      <h1>文章列表</h1>
      {/* <h2>共 {props.count} 篇,  每页 {props.perPage} 篇</h2> */}
      {
        props.posts.map(i => {
          return (
            <div key={i.id} className="one-post" >
              {/* <Link href={`/posts/${i.id}`}> */}
              <Link href="/posts/[id]" as={`/posts/${i.id}`}>
                <a>{i.title}</a>
              </Link>
            </div>
          )
        })
      }
      <footer style={{ marginTop: 24 }}>
        { pager }
      </footer>

    <style jsx>{`
      .posts{
        max-width: 800px;
        max-height: 800px;
        margin: 0 auto;
        padding: 16px
      }
      .one-post{
        border-bottom: 1px solid #ddd;
        padding: 8px 0;
      }
      .one-post > a:hover{
        color: #1b9cff;
      }
    `}</style>
    </div>
  )
}

export default PostsIndex

// 数据库获取数据
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 分页设置
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index + 1)
  const query = qs.parse(search)
  const page = parseInt(query.page?.toString() || '1')
  const perPage = 12

  const connection = await getDatabaseConnection()
  const [posts, count] = await connection.manager.findAndCount(Post, { skip: (page - 1) * perPage, take: perPage })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      count: count - 1,
      perPage,
      page,
      totalPage: Math.ceil((count - 1) / perPage)
    }
  }
}

// 本地获取数据
// export const getStaticProps: GetStaticProps = async () => {
//   const posts = await getPosts()
//   return {
//     props:{
//       posts: JSON.parse(JSON.stringify(posts))
//     }
//   }
// }
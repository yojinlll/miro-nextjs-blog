import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import { Button } from "components"
import qs from "querystring"

type Props = {
  posts: Post[],
  count: number
  perPage: number
  page: number
  totalPage: number
}

const PostsIndex: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>文章列表</h1>
      <h2>共 {props.count} 篇,  每页 {props.perPage} 篇</h2>
      {
        <div style={{ minHeight: 200 }}>
          {
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
      <footer style={{ marginTop: 24 }}>
        <h3>当前第 {props.page} / {props.totalPage} 页</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {
            props.page > 1
              ? <Link href={`/?page=${props.page - 1}`}><a><Button>上一页</Button></a></Link>
              : <div />
          }

          {
            props.page >= props.totalPage
              ? <div />
              : <Link href={`/?page=${props.page + 1}`}><a><Button>下一页</Button></a></Link>
          }
        </div>
      </footer>
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
  const perPage = 6

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
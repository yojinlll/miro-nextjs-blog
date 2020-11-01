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

  useRedirect(currentUser)

  return (
    <div className="posts">
      <header className="posts-header flex">
        <h1>Notes</h1>

        { currentUser && <Link href="/posts/new"><a>
          <Button>New</Button>
        </a></Link> }
      </header>
      <main className="posts-list">
        {
          props.posts.map(i => {
            return (
              <Link href="/posts/[id]" as={`/posts/${i.id}`} key={i.id}>
                <a className="post-item">{i.title}</a>
              </Link>
            )
          })
        }
      </main>
      <footer style={{ marginTop: 24 }}>
        {pager}
      </footer>


      <style jsx>{`
        .posts{
          width: 94vw;
          max-width: 800px;
          max-height: 800px;
          margin: 0 auto;
        }
        .post-item{
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
          display: block;
        }
        .post-item:hover{
          color: #1b9cff; cursor: pointer;
        }
        .posts-list{
          height: 80vh;
        }
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
    order: { id: "DESC" },
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
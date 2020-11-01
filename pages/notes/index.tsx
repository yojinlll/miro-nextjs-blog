import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Button } from "components"
import stylesClass from "./index.module.scss"
import { withSession } from "lib/withSession";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import qs from "querystring"
import { User } from "src/entity/User";

const sc = stylesClass

type Props = {
  posts: Post[],
  count: number
  perPage: number
  page: number
  totalPage: number
  currentUser: User | null
}
const Notes: NextPage<Props> = (props) => {
  const { currentUser, posts } = props
  // console.log(props);
  
  return (
    <div className={sc.wrapper}>
      {/* <aside className={sc.aside}>
        <div>username</div>
        <Button>logout</Button>
      </aside> */}
      <div className={sc.container}>
        <div className={sc['note-list']}>
          {
            posts.map(i => {
              return (
                <div key={i.id} className="one-post" >
                  {i.title}
                </div>
              )
            })
          }
        </div>
        <div className={sc['note-item']}>
          content
        </div>
      </div>
    </div>
  )
}

export default Notes

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
  const [posts, count] = await connection.manager.findAndCount(Post, { skip: (page - 1) * perPage, take: perPage })

  const test = await connection.manager.find(Post, { authorId: 3 })
  console.log('test', test);
  

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
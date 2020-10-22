import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>文章列表</h1>
      {
        <div>
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
    </div>
  )
}

export default PostsIndex

// 数据库获取数据
export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
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
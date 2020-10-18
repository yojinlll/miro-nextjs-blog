import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next'
import { Post } from 'src/entity/Post';
// import Link from 'next/link'
import { UAParser } from "ua-parser-js";

type Props = {
  posts: Post[]
  browser: {
    major: string
    name: string
    version:  string
  }
}

const SSRIndex: NextPage<Props> = (props) => {
  console.log('props.post', props.posts);
  
  return (
    <div>
      <h1>SSR test</h1>

      <h2>你的浏览器是 { JSON.stringify(props.browser) }</h2>

      <div>
        {
          props.posts.map(post => {
            return <div key={post.id}>
              {post.title}
            </div>
          })
        }
      </div>
    </div>
  )
}

export default SSRIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  
  const posts = await connection.manager.find(Post)
  console.log('posts', JSON.stringify(posts[0].createdAt), typeof posts[0].createdAt);
  

  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
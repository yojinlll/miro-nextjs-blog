import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
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
      <h1>文章列表</h1>

      {
        props.posts.map(post => {
          return <Link href={`/posts/${post.id}`} key={post.id}>
            {post.title}
          </Link>
        })
      }
    </div>
  )
}

export default SSRIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  
  const posts = await connection.manager.find(Post)

  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
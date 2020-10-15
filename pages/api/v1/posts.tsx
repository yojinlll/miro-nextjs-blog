import { NextApiHandler } from 'next'
import { getPosts } from 'lib/posts'

const Posts: NextApiHandler = async (req, res) => {
  const results = await getPosts()
  res.statusCode = 200
  res.setHeader("Content-type", "application/json")
  res.write(JSON.stringify(results))
  res.end()
}

export default Posts
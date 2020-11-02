import { withSession } from 'lib/withSession'
import { NextApiHandler } from 'next'

const Logout: NextApiHandler = async (req, res) => {
  res.setHeader("Content-type", "application/json; charset=utf-8")
  if (req.method === 'GET') {
    await req.session.destroy()
    res.statusCode = 200
    res.end()
  }
}

export default withSession(Logout)
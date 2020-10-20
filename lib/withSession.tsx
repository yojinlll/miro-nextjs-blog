import { withIronSession } from "next-iron-session"
import { GetServerSideProps, NextApiHandler } from "next"

export function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    // .env.local 下定义 session 密码
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {
      secure:false
    }
  })
}

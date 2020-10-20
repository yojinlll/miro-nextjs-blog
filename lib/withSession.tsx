import { withIronSession } from "next-iron-session"
import { NextApiHandler } from "next"

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // .env.local 下定义 session 密码
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {
      secure:false
    }
  })
}

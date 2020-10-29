/**
 * 给 NextApiRequest 接口扩展 session 
 * 含有 import 语法的 [name].d.ts 会干扰该文件内其他的全局接口声明，所以需要分离
 */
import "next"
import { Session } from "next-iron-session";

declare module 'next' {
  interface NextApiRequest{
    session: Session
  }
}
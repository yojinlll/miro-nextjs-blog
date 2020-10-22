import { getDatabaseConnection } from "lib/getDatabaseConnection"
import md5 from "md5"
import { User } from "src/entity/User"

export class SignIn {
  user: User
  username: string
  password: string
  constructor(params: { username: string, password: string }) {
    this.username = params.username
    this.password = params.password
  }

  errors = {
    username: [] as string[],
    password: [] as string[],
  }

  async validate() {
    const connection = await getDatabaseConnection()
    this.user = await connection.manager.findOne(User, { where: { username: this.username } })

    if (this.username.trim() === '') {
      this.errors.username.push('请填写用户名')
    }else{
      if (this.user) {
        this.user.passwordDigest !== md5(this.password) && this.errors.password.push('密码不匹配')
      } else {
        this.errors.username.push('用户名不存在')
      }
    }

    if(this.password === ''){
      this.errors.password.push('不能为空')
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(v => v.length > 0)
  }
}
import {BeforeInsert, Column, CreateDateColumn, Entity, getConnection, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import _ from "lodash"

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  username: string

  @Column('varchar')
  passwordDigest: string

  @CreateDateColumn()
  createdAt: Date
  @CreateDateColumn()
  updatedAt: Date

  @OneToMany(type => Post, post => post.author)
  posts: Post[]
  
  @OneToMany(type  => Comment, comment => comment.user)
  comments: Comment[]

  /**------------ */
  password:string
  passwordConfirmation:string

  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  }

  async validate() {
    const connection = await getDatabaseConnection()
    const username = this.username
    const password = this.password
    const passwordConfirmation = this.passwordConfirmation

    if(username.trim() === ''){
      this.errors.username.push('不能为空')
    }
    if(username.trim().length > 12){
      this.errors.username.push('太长')
    }
    if(username.trim().length < 3 ){
      this.errors.username.push('太短')
    }
    if(!/^[a-z0-9A-Z]{0,12}$/.test(username.trim())){
      this.errors.username.push('格式不正确')
    }
  
    if(password === ''){
      this.errors.password.push('不能为空')
    }
  
    if(password !== passwordConfirmation){
      this.errors.passwordConfirmation.push('密码不匹配')
    }
  
    const found = await connection.manager.find(User, { username: username.trim() })
    if(found.length > 0){
      this.errors.username.push(`${username.trim()} 已存在`)
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(v => v.length > 0)
  }

  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password)
  }

  toJSON(){
    return JSON.stringify(_.omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'errors']))
  }

  async save() {
    const connection = getConnection()
    await connection.manager.save(this)
  }
}

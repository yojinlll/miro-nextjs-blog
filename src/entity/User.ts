import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
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

  // @OneToMany(type => Post, post => post.author)
  @OneToMany('Post', 'author')
  posts: Post[]
  
  // @OneToMany(type  => Comment, comment => comment.user)
  @OneToMany('Comment', 'user')
  comments: Comment[]

  password:string

  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password)
  }

  toJSON(){
    return JSON.stringify(_.omit(this, ['password']))
  }
}

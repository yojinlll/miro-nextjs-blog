import { type } from "os";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  username: string

  @Column('varchar')
  passwordDigest: string

  @CreateDateColumn('time')
  createdAt: Date
  @CreateDateColumn('time')
  updatedAt: Date

  @OneToMany(type => Post, post => post.author)
  posts: Post[]
  
  @OneToMany(type  => Comment, comment => comment.user)
  comments: Comment[]
}

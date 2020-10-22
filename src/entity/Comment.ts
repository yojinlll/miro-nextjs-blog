import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  content: string

  @CreateDateColumn()
  createdAt: Date
  @CreateDateColumn()
  updatedAt: Date

  // @ManyToOne(type => User, user => user.comments)
  @ManyToOne('User', 'comments')
  user: User

  // @ManyToOne(type => Post, post => post.comments)
  @ManyToOne('Post', 'comments')
  post: Post

}

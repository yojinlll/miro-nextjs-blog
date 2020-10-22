import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  title: string

  @Column('text')
  content: string

  @Column('int')
  authorId: number

  @CreateDateColumn()
  createdAt: Date
  @CreateDateColumn()
  updatedAt: Date

  // @ManyToOne(type => User, user => user.posts)
  @ManyToOne('User' , 'posts')
  author: User
  
  // @OneToMany(type => Comment, comment => comment.post)
  @OneToMany('Comment', 'post')
  comments: Comment[]
}

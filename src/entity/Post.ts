import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  title: string

  @Column('text')
  content: string

  @Column('int')
  authorId: string

  @CreateDateColumn('time')
  createdAt: Date
  @CreateDateColumn('time')
  updatedAt: Date

  @ManyToOne(type => User, user => user.posts)
  author: User
  
  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[]
}

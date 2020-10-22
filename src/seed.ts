import "reflect-metadata";
import { createConnection } from "typeorm";
import { Comment } from "./entity/Comment";
import { Post } from "./entity/Post";
import { User } from "./entity/User";

createConnection().then(async connection => {
  const {manager} = connection

  const u1 = new User()
  u1.username = 'jin'
  u1.passwordDigest = 'jin123'
  await manager.save(u1)

  const p1 = new Post()
  p1.title = 'post 1'
  p1.content = 'post content 1'
  p1.author = u1
  await manager.save(p1)

  const c1 = new Comment()
  c1.user = u1
  c1.post = p1
  c1.content = 'post 1 - comment 1'
  await manager.save(c1)

  await connection.close()
  console.log('Done!');
}).catch(error => console.log(error));

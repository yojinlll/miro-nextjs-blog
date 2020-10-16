import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";

createConnection().then(async connection => {
  // console.log('connection', connection);
  const posts = await connection.manager.find(Post)
  // if(posts.length){
    // const p = new Post()
    // p.title = 'first md 1'
    // p.content = 'first md content'
    // await connection.manager.save(p)
  // }
    
  // console.log('-post', new Post('first md 1--', 'first md content--'));
  
  if(posts.length === 0){
    await connection.manager.save([1,2,3,4,5].map(i =>{
      return new Post({title: `first md ${i}--`, content: `first md ${i} content--`})
    }))
  }

  console.log('-posts', posts);

  connection.close()
}).catch(error => console.log(error));

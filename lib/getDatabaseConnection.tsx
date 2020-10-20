import { createConnection, getConnection, getConnectionManager } from "typeorm";
import "reflect-metadata";
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";
import config from "ormconfig.json"

// ~(function (){
//   console.log('test')
// })()

export const getDatabaseConnection = async () => {
  return (async function () {
    const manager = getConnectionManager()

    manager.has('default') && await manager.get('default').close()
    
    // @ts-ignore, 让 typeorm 识别已声明的实体
    return createConnection({
      ...config,
      "entities": [ Post, User, Comment ]
    })
  })()
}
import { createConnection, getConnectionManager } from "typeorm";
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
    
    const current = manager.has('default') && manager.get('default')
    if(current.isConnected){ await current.close() }    
    
    // @ts-ignore, 让 typeorm 识别已声明的实体
    return createConnection({
      ...config,
      host: process.env.NODE_ENV === "production" ? "localhost" : config.host,
      "entities": [ Post, User, Comment ]
    })
  })()
}
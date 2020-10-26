import { NextApiHandler } from 'next'
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import { withSession } from 'lib/withSession';

const Posts: NextApiHandler = withSession(async (req, res) => {
  res.setHeader("Content-type", "application/json; charset=utf-8")

  const user = JSON.parse(req.session.get('currentUser') || null);
  if (!user) {
    res.statusCode = 401;
    res.end('未登录');
    return;
  }
  
  const connection = await getDatabaseConnection();

  if (req.method === 'PATCH') {
    const {title, content,id} = req.body;

    const post = await connection.manager.findOne(Post, id)
    if(user.id !== post.authorId){
      res.statusCode = 403  // 身份不对，无权限
      res.json('你并不是原作者，无权修改');
      return 
    }
    
    post.title = title;
    post.content = content;

    await connection.manager.save(post);
    res.statusCode = 200
    res.json(post);
  }
})

export default Posts
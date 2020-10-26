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
  const id = req.query.id.toString()

  if (req.method === 'PATCH') {
    const { title, content } = req.body;

    const post = await connection.manager.findOne(Post, id)
    post.title = title;
    post.content = content;
    // if(user.id !== post.authorId){
    //   res.statusCode = 403  // 身份不对，无权限
    //   res.json('你并不是原作者，无权修改');
    //   return 
    // }

    await connection.manager.save(post);
    res.statusCode = 200
    res.json(post);

  } else if (req.method === 'DELETE') {
    const result = await connection.manager.delete(Post, id)
    const { affected } = result

    res.statusCode = affected >= 0 ? 200 : 400
    res.end();
  }
})

export default Posts
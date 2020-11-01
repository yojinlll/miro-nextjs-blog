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

  if (req.method === 'POST') {
    const {title, content} = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.authorId = user.id;
    post.author = user;
    post.createdAt = new Date();
    post.updatedAt = new Date();

    await connection.manager.save(post);
    res.statusCode = 200
    res.json(post);
  }
})

export default Posts
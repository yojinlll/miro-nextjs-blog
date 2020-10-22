import { NextApiHandler } from 'next'
import { getPosts } from 'lib/posts'
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import { withSession } from 'lib/withSession';

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const {title, content} = req.body;
    const user = JSON.parse(req.session.get('currentUser') || '{}');
    console.log('user', user.id);

    const post = new Post();
    post.title = title;
    post.content = content;
    // post.authorId = user.id;
    post.author = user;
    
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.statusCode = 200
    res.json(post);
  }
})

export default Posts
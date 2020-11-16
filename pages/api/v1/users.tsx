import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { NextApiHandler } from 'next'
import { User } from 'src/entity/User';
import { Post } from 'src/entity/Post';
import { getConnection } from 'typeorm';

const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation} = req.body

  const user = new User()
  user.username = username.trim()
  user.password = password
  user.createdAt = new Date();
  user.updatedAt = new Date();
  const [hasErrors, errors] = await validate(user.username, password, passwordConfirmation)
  
  res.setHeader("Content-type", "application/json; charset=utf-8")
  if(hasErrors){
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  }else{
    const connection = getConnection()
    const _user = await connection.manager.save(user)

    const post = new Post();
    post.title = 'README';
    post.content = '# [Mironote 支持 Markdown 语法](https://github.com/guodongxiaren/README/blob/master/README.md)。';
    post.authorId = _user.id;
    post.author = _user;
    post.createdAt = new Date();
    post.updatedAt = new Date();
    await connection.manager.save(post);

    res.statusCode = 200
    res.write(user.toJSON())
  }

  res.end()
}

export default Users

// user 校验
const validate = async (username: string, password: string, passwordConfirmation: string) => {
  const connection = await getDatabaseConnection()

  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  }

  if(username.trim() === ''){
    errors.username.push('不能为空')
  }else if(username.trim().length > 12){
    errors.username.push('太长')
  }else if(username.trim().length < 3 ){
    errors.username.push('太短')
  }else if(!/^[a-z0-9A-Z]{0,12}$/.test(username.trim())){
    errors.username.push('格式不正确')
  }

  if(password === ''){
    errors.password.push('不能为空')
  }

  if(password !== passwordConfirmation){
    errors.passwordConfirmation.push('密码不匹配')
  }

  const found = await connection.manager.findOne(User, { username: username.trim() })
  if(found){
    errors.username.push(`${username.trim()} 已存在`)
  }

  return [
    !!Object.values(errors).find(v => v.length > 0),
    errors
  ]
}
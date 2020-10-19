import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import md5 from 'md5';
import { NextApiHandler } from 'next'
import { User } from 'src/entity/User';

const Posts: NextApiHandler = async (req, res) => {
  console.log(req.body);
  const { username, password, passwordConfirmation} = req.body

  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  }

  if(username.trim() === ''){
    errors.username.push('不能为空')
  }
  if(username.trim().length > 12){
    errors.username.push('太长')
  }
  if(username.trim().length < 3 ){
    errors.username.push('太短')
  }
  if(!/^[a-z0-9A-Z]{0,12}$/.test(username.trim())){
    errors.username.push('格式不正确')
  }

  if(password === ''){
    errors.password.push('不能为空')
  }

  if(password !== passwordConfirmation){
    errors.password.push('密码不匹配')
  }

  const hasErrors = Object.values(errors).find(v => v.length > 0)

  res.setHeader("Content-type", "application/json; charset=utf-8")

  if(hasErrors){
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  }else{
    const connection = await getDatabaseConnection()
    
    const user = new User()
    user.username = username.trim()
    user.passwordDigest = md5(password)
    await connection.manager.save(user)
    
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }

  res.end()
}

export default Posts
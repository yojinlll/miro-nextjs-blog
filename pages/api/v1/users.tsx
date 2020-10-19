import { NextApiHandler } from 'next'
import { User } from 'src/entity/User';

const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation} = req.body

  const user = new User()
  user.username = username.trim()
  user.password = password
  user.passwordConfirmation = passwordConfirmation
  await user.validate()
  
  res.setHeader("Content-type", "application/json; charset=utf-8")
  if(user.hasErrors()){
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  }else{
    await user.save()
    res.statusCode = 200
    res.write(user.toJSON())
  }

  res.end()
}

export default Users
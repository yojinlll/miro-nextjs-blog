import { getDatabaseConnection } from 'lib/getDatabaseConnection'
import md5 from 'md5'
import { NextApiHandler } from 'next'
import { User } from 'src/entity/User'
import { SignIn } from 'src/model/SignIn'

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body

  res.setHeader("Content-type", "application/json; charset=utf-8")

  const signIn = new SignIn({ username, password })
  await signIn.validate()

  if(signIn.hasErrors()){
    res.statusCode = 422
    res.end(JSON.stringify(signIn.errors))
  }else{
    res.statusCode = 200
    res.end(signIn.user.toJSON())
  }

}

export default Sessions
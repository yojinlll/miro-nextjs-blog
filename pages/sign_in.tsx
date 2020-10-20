import Axios, { AxiosError } from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useCallback, useState } from "react";
import axios from "axios"
import { User } from "src/entity/User";
import { withSession } from "lib/withSession";

const SignIn: NextPage<{user: User}> = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  })


  const onSubmit = useCallback((e) => {
    e.preventDefault()
    
    axios.post('/api/v1/sessions', formData)
      .then(res => {
        // alert('登录成功！')
        setErrors({ username: [], password: [] })
      })
      .catch(err => {
        const error = err as AxiosError
        if (error.response) {
          // error.response.status === 422
          setErrors(error.response.data)
        }
      })
  }, [formData])

  return (
    <>
      <h1>user: {  props.user?.username }</h1>
      <h1>登录</h1>
      <p>{JSON.stringify(formData)}</p>
      <p>{JSON.stringify(errors)}</p>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input type="text" value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
          </label>
          <span style={{ fontSize: '14px', color: '#ee4949' }}>{errors.username?.length > 0 && errors.username[0]}</span>
        </div>
        <div>
          <label>
            密码
            <input type="password" value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </label>
          <span style={{ fontSize: '14px', color: '#ee4949' }}>{errors.password?.length > 0 && errors.password[0]}</span>
        </div>

        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  
  return {
    props: {
      user: user && JSON.parse(user)
    }
  }
})
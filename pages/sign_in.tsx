import axios, { AxiosError } from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { Fragment } from "react";
import { User } from "src/entity/User";
import { withSession } from "lib/withSession";
import { Button } from "components"
import { useForm } from "hooks/useForm";
import qs from "querystring"

const SignIn: NextPage<{user: User}> = (props) => {
  const {form, setErrors} = useForm({
    initFormData: {
      username: '',
      password: '',
    },
    fields: [
      { name: "username", label: "用户名", input: {type: 'text'} },
      { name: "password", label: "密码", input: { type: "password" } },
    ],
    buttons: (<Fragment>
      <Button type="submit" style={{marginRight: 20}}>登录</Button>
      <Button>注册</Button>
    </Fragment>),
    submit: (formData) => {
      console.log('submit', formData);
      
      axios.post('/api/v1/sessions', formData)
        .then(res => {
          setErrors({ username: [], password: [] })
          alert('登录成功！')

          if(window.location.search){
            const query = qs.parse(window.location.search.substr(1))
            window.location.href = query.returnTo.toString()
          }
        })
        .catch(err => {
          const error = err as AxiosError
          if (error.response) {
            setErrors(error.response.data)
          }
        })
    }
  })

  return (
    <>
      <h1>user: {  props.user?.username }</h1>
      <h1>登录</h1>

      <div style={{maxWidth: 280}}>
       { form }
      </div>
    </>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  
  return {
    props: {
      user: JSON.parse(user || '0')
    }
  }
})
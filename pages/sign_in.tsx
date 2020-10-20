import axios, { AxiosError } from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { Fragment, useCallback, useState } from "react";
import { User } from "src/entity/User";
import { withSession } from "lib/withSession";
import { Button, Form } from "components"
import { FormValue } from "miro-react-demo";

const SignIn: NextPage<{user: User}> = (props) => {
  const fields = [
    { name: "username", label: "用户名", input: {type: 'text'} },
    { name: "password", label: "密码", input: { type: "password" } },
  ]
  const [formData, setFormData] = useState<FormValue>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  })

  const onFormDataChange = useCallback(async (newValue: FormValue) => {
    setFormData(newValue)
  }, [formData])
  const onFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    axios.post('/api/v1/sessions', formData)
      .then(res => {
        // alert('登录成功！')
        setErrors({ username: [], password: [] })
      })
      .catch(err => {
        const error = err as AxiosError
        if (error.response) {
          setErrors(error.response.data)
        }
      })
  }, [formData])

  return (
    <>
      <h1>user: {  props.user?.username }</h1>
      <h1>登录</h1>
      <p>formData: {JSON.stringify(formData)}</p>
      <p>errors: {JSON.stringify(errors)}</p>

      <div style={{maxWidth: 280}}>
        <Form
          value={formData}
          fields={fields}
          onChange={onFormDataChange}
          onSubmit={onFormSubmit}
          errors={errors}
          footer={
            <Fragment>
              <Button type="submit" style={{marginRight: 20}}>登录</Button>
              <Button>注册</Button>
            </Fragment>
          }
        />
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
      user: user && JSON.parse(user)
    }
  }
})
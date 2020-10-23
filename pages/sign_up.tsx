import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import React from "react";
import { Button } from "components"
import { useForm } from "hooks/useForm";

const SignUp: NextPage = () => {
  const {form, setErrors} = useForm({
    initFormData: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    fields: [
      { name: "username", label: "用户名", input: {type: 'text'} },
      { name: "password", label: "密码", input: { type: "password" } },
      { name: "passwordConfirmation", label: "确认密码", input: { type: "password" } },
    ],
    buttons: <Button type="submit" style={{marginRight: 20}}>注册</Button>,
    submit: (formData) => {
      axios.post('/api/v1/users', formData)
        .then(res => {
          alert('注册成功！')
          setErrors({ username: [], password: [], passwordConfirmation: [], })
          window.location.pathname = '/sign_in'
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
      <h1>注册</h1>
      <div style={{maxWidth: 280}}>
        { form }
      </div>
    </>
  )
}

export default SignUp
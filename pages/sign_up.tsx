import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Button, Form } from "components"
import { FormValue } from "miro-react-demo";

const SignUp: NextPage = () => {
  const fields = [
    { name: "username", label: "用户名", input: {type: 'text'} },
    { name: "password", label: "密码", input: { type: "password" } },
    { name: "passwordConfirmation", label: "确认密码", input: { type: "password" } },
  ]
  const [formData, setFormData] = useState<FormValue>({
    username: '',
    password: '',
    passwordConfirmation: '',
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  })

  const onFormDataChange = useCallback(async (newValue: FormValue) => {
    setFormData(newValue)
  }, [formData])
  const onFormSubmit = useCallback((e) => {
    axios.post('/api/v1/users', formData)
      .then(res => {
        // alert('注册成功！')
        setErrors({ username: [], password: [], passwordConfirmation: [], })
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
      <h1>注册</h1>
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
            <Button type="submit" style={{marginRight: 20}}>注册</Button>
          }
        />
      </div>
    </>
  )
}

export default SignUp
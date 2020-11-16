import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import React from "react";
import { Button } from "components"
import { useForm } from "hooks/useForm";
import Link from "next/link";
import Swal from 'sweetalert2'

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
    buttons: (<>
      <Button type="submit" style={{marginRight: 20}}>注册</Button>
      <Link href={`/sign_in`}><a><Button type="button">已有账号</Button></a></Link>
    </>),
    submit: (formData) => {
      axios.post('/api/v1/users', formData)
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Done!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            setErrors({ username: [], password: [], passwordConfirmation: [], })
            window.location.href = `/sign_in?username=${formData.username}`
          })
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
      <div className="sign-up">
        <h1>M</h1>
        { form }
      </div>

      <style jsx>{`
        .sign-up{
          max-width: 280px;
          margin: 0 auto;
        }
        h1{
          font-size: 120px;
          text-align: center;
          margin-bottom: 32px;
          font-family: Cardo,serif;
        }
        @media (max-width: 320px){
          h1{ font-size: 80px;}
        }
      `}</style>
    </>
  )
}

export default SignUp
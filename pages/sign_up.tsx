import Axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import axios from "axios"

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  })


  const onSubmit = useCallback((e) => {
    e.preventDefault()
    axios.post('/api/v1/users', formData)
      .then(res => { 
        console.log('res', res.data);
        setErrors({
          username: [],
          password: [],
          passwordConfirmation: [],
        })
      })
      .catch(err => {
        const error = err as AxiosError
        if (error.response) {
          // error.response.status === 422
          setErrors({ ...errors, ...error.response.data })
        }
      })

    console.log('onSubmit', formData);
  }, [formData])

  return (
    <>
      <h1>注册</h1>
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
          <span style={{fontSize: '14px', color: '#ee4949'}}>{ errors.username?.length > 0 && errors.username[0] }</span>
        </div>
        <div>
          <label>
            密码
            <input type="password" value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </label>
          <span style={{fontSize: '14px', color: '#ee4949'}}>{ errors.password?.length > 0 && errors.password[0] }</span>
        </div>
        <div>
          <label>
            确认密码
            <input type="password" value={formData.passwordConfirmation}
              onChange={e => setFormData({ ...formData, passwordConfirmation: e.target.value })}
            />
          </label>
          <span style={{fontSize: '14px', color: '#ee4949'}}>{ errors.passwordConfirmation?.length > 0 && errors.passwordConfirmation[0] }</span>
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  )
}

export default SignUp
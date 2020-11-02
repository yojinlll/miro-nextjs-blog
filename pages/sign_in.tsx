import axios, { AxiosError } from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { User } from "src/entity/User";
import { withSession } from "lib/withSession";
import { Button } from "components"
import { useForm } from "hooks/useForm";
import qs from "querystring"
import Link from "next/link";

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
    buttons: (<>
      <Button type="submit" style={{marginRight: 20}}>登录</Button>
      <Link href={`/sign_up`}><a><Button type="button">前往注册</Button></a></Link>
    </>),
    submit: (formData) => {
      axios.post('/api/v1/sessions', formData)
        .then(res => {
          setErrors({ username: [], password: [] })
          // alert('登录成功！')

          if(window.location.search){
            const query = qs.parse(window.location.search.substr(1))
            window.location.href = query.returnTo.toString()
          }else{
            window.location.href = '/'
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
      <div className="sign-in">
        <h1>M</h1>
        { form }
      </div>

      <style jsx>{`
        .sign-in{
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

export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser') || null
  
  return {
    props: {
      user: JSON.parse(user)
    }
  }
})
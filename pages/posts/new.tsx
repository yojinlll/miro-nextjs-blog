import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { Button } from "components"
import { useForm } from "hooks/useForm";

const PostsNew: NextPage = (props) => {
  const {form, setErrors} = useForm({
    initFormData: { title: '', content: '' },
    fields: [
      { name: "title", label: "title", input: {type: 'text'} },
      { name: "content", label: "content", input: {type: 'textarea'}},
    ],
    buttons: <Button type="submit" style={{marginRight: 20}}>上传</Button>,
    submit: (formData) => {
      axios.post('/api/v1/posts', formData)
        .then(res => {
          alert('done！')
        })
        .catch(err => {
          const error = err as AxiosError
          if (error.response) {
            if(error.response.status === 401){
              alert('未登录')
              window.location.href = `/sign_in?returnTo=${window.location.pathname}`
            }
          }
        })
    }
  })

  return (
    <>
      <h1>文章</h1>

      <div style={{maxWidth: 280}}>
        { form }
      </div>
    </>
  )
}

export default PostsNew
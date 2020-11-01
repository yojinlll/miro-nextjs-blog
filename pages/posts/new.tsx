import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { Button } from "components"
import { useForm } from "hooks/useForm";
import Router from "next/router"

const PostsNew: NextPage = (props) => {
  const {form, setErrors} = useForm({
    initFormData: { title: '', content: '' },
    fields: [
      { name: "title", label: "title", input: {type: 'text'} },
      { name: "content", label: "content", input: {type: 'textarea'}},
    ],
    buttons: <Button type="submit" style={{marginRight: 20}}>提交</Button>,
    submit: (formData) => {
      if(formData.title.trim() && formData.content){
        axios.post('/api/v1/posts', formData)
          .then(res => {
            alert('done！')
            Router.push("/posts")
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
      }else{
        alert('请输入标题和内容')
      }
    }
  })

  return (
    <>
      <div className="wrapper">
        <h1>New</h1>

        <div className="post-new">
          { form }
        </div>      
      </div>

      <style jsx>{`
        .wrapper {
          width: 90vw;
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
      <style jsx global>{`
        .post-new .miro-form-table tr:nth-child(1) td:first-child,
        .post-new .miro-form-table tr:nth-child(3) td:first-child,
        .post-new .miro-form-table tr:nth-child(5) td:first-child{
          display: none
        }

        .post-new .miro-input{
          height: 3em;
        }
        .post-new .field-textarea{
          border: 1px solid #ced4da;
          padding: .375rem .75rem;
          border-radius: .25rem;
          width: 90vw;
          max-width: 800px;
          min-height: 60vh;
          transition: border-color .25s,box-shadow .25s;
          resize: none
        }
        .post-new .field-textarea:focus{
          color: #495057;
          border-color: #b3d7ff;
          outline: 0;
          box-shadow: 0 0 0 2px #007bff40;
        }
        .post-new .miro-button{
          display: block;
          margin-left: auto;
          margin-right: 0 !important;
        }
      `}</style>
    </>
  )
}

export default PostsNew
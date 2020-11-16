import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { Button } from "components"
import { useForm } from "hooks/useForm";
import Router from "next/router"
import Swal from 'sweetalert2'

const PostsNew: NextPage = (props) => {
  const {form, setErrors} = useForm({
    initFormData: { title: '', content: '' },
    fields: [
      { name: "title", label: "title", input: {type: 'text'} },
      { name: "content", label: "content", input: {type: 'textarea'}},
    ],
    buttons: <Button type="submit" style={{marginRight: 20}}>Commit</Button>,
    submit: (formData) => {
      if(formData.title.trim()){
        axios.post('/api/v1/posts', formData)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: 'Done!',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              Router.push("/posts")
            })
          })
          .catch(err => {
            const error = err as AxiosError
            if (error.response) {
              if(error.response.status === 401){
                Swal.fire({
                  icon: 'error',
                  title: '未登录',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  Router.push(`/sign_in?returnTo=${window.location.pathname}`)
                })
              }
            }
          })
      }else{
        Swal.fire({
          icon: 'error',
          title: '标题不可为空',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  })

  return (
    <>
      <div className="new-wrapper">
        <header>
          <Button onClick={()=>Router.push("/posts")}>Back</Button>
        </header>

        <div className="post-new">
          { form }
        </div>      
      </div>

      <style jsx>{`
        .new-wrapper {
          width: 90vw;
          max-width: 800px;
          margin: 0 auto;
          padding-bottom: 24px;
        }
        .new-wrapper header{
          margin-top: 12px;
          margin-bottom: 24px;
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
        .post-new .field-textarea:hover,
        .post-new .field-textarea:focus{
          border-color: #c39c5a;
          outline: 0;
          box-shadow: 0 0 6px 2px #c39c5a42;
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
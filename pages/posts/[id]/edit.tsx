import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { User } from "src/entity/User";
import axios, { AxiosError } from "axios";
import { Button } from "components"
import { useForm } from "hooks/useForm";
import { Post } from "src/entity/Post";

type Props = {
  id: number,
  post: Post
  currentUser: User
  isPostAuthor: boolean
}

const PostEdit: NextPage<Props> = (props) => {
  const { post: { title, content }, id } = props
  
  const {form, setErrors} = useForm({
    initFormData: { title, content },
    fields: [
      { name: "title", label: "title", input: {type: 'text'} },
      { name: "content", label: "content", input: {type: 'textarea'}},
    ],
    buttons: <Button type="submit" style={{marginRight: 20}}>提交</Button>,
    submit: (formData) => {
      // if(formData.title && formData.content){
      //   axios.patch(`/api/v1/posts/${id}`, formData)
      //     .then(res => {
      //       alert('done！')
      //     })
      //     .catch(err => {
      //       const error = err as AxiosError
      //       if (error.response) {
      //         if(error.response.status === 401){
      //           alert('未登录')
      //           window.location.href = `/sign_in?returnTo=${window.location.pathname}`
      //         }
      //       }
      //     })
      // }else{
      //   alert('请输入标题和内容')
      // }
    }
  })

  return (
    <>
      <div className="wrapper">
        <h1>Edit</h1>

        <div className="post-edit">
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
        .post-edit .miro-form-table tr:nth-child(1) td:first-child,
        .post-edit .miro-form-table tr:nth-child(3) td:first-child,
        .post-edit .miro-form-table tr:nth-child(5) td:first-child{
          display: none
        }

        .post-edit .miro-input{
          height: 3em;
        }
        .post-edit .field-textarea{
          border: 1px solid #ced4da;
          padding: .375rem .75rem;
          border-radius: .25rem;
          width: 90vw;
          max-width: 800px;
          min-height: 60vh;
          transition: border-color .25s,box-shadow .25s;
          resize: none
        }
        .post-edit .field-textarea:focus{
          color: #495057;
          border-color: #b3d7ff;
          outline: 0;
          box-shadow: 0 0 0 2px #007bff40;
        }
        .post-edit .miro-button{
          display: block;
          margin-left: auto;
          margin-right: 0 !important;
        }
      `}</style>
    </>
  )
}

export default PostEdit

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const currentUser = JSON.parse(context.req.session.get('currentUser') || null)

  const id = context.params.id.toString()
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, id)
  const _post = JSON.parse(JSON.stringify(post))
  
  return {
    props: {
      id: parseInt(id),
      post: _post,
      currentUser,
      isPostAuthor: _post.authorId === currentUser.id
    }
  }
})
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import axios from "axios";
import { Button } from "components"
import { useForm } from "hooks/useForm";
import { Post } from "src/entity/Post";
import { withSession } from "lib/withSession";
import { User } from "src/entity/User";
import { useRedirect } from "hooks/useRedirect";

type Props = {
  currentUser: User | null
  id: number
  post: Post
}

const PostEdit: NextPage<Props> = (props) => {
  const { post, id, currentUser } = props

  const { form, setErrors } = useForm({
    initFormData: post || { title: '', content: '' },
    fields: [
      { name: "title", label: "title", input: { type: 'text' } },
      { name: "content", label: "content", input: { type: 'textarea' } },
    ],
    buttons: <Button type="submit" style={{ marginRight: 20 }}>提交</Button>,
    submit: (formData) => {
      if (formData.title.trim() && formData.content) {
        axios.patch(`/api/v1/posts/${id}`, formData)
          .then(res => {
            alert('done!')
            window.history.go(-1)
          })
          .catch(err => {
            alert('error!')
          })
      } else {
        alert('请输入标题和内容')
      }
    }
  })

  useRedirect(currentUser, post)

  return (
    <>
      <div className="edit-wrapper">
        <header className="edit-header">
          <Button onClick={()=>{ window.history.go(-1) }}>Back</Button>
        </header>
        
        <div className="post-edit">
          {form}
        </div>
      </div>

      <style jsx>{`
        .edit-wrapper {
          width: 90vw;
          max-width: 800px;
          margin: 0 auto;
          padding-bottom: 12px;
        }
        .edit-header{
          padding: 12px 0 24px;
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
          padding: .75rem .75rem;
          border-radius: .25rem;
          width: 90vw;
          max-width: 800px;
          min-height: 60vh;
          transition: border-color .25s,box-shadow .25s;
          resize: none;
          background: none;
        }

        .post-edit .field-textarea:hover,
        .post-edit .field-textarea:focus{
          border-color: #c39c5a;
          outline: 0;
          box-shadow: 0 0 6px 2px #c39c5a42;
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
  const post = await connection.getRepository(Post).findOne({ where: { authorId: currentUser?.id, id } })
  const _post = JSON.parse(JSON.stringify(post || null))

  return {
    props: {
      currentUser,
      id: parseInt(id),
      post: _post
    }
  }
})
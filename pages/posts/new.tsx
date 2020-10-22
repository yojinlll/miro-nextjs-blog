import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Button, Form } from "components"
import { FormValue } from "miro-react-demo";

const PostsNew: NextPage = (props) => {
  const [formData, setFormData] = useState<FormValue>({
    title: '',
    content: '',
  })

  const [errors, setErrors] = useState({
    title: [],
    content: [],
  })
  const onFormDataChange = useCallback(async (newValue: FormValue) => {
    setFormData(newValue)
  }, [formData])
  
  function onTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    const newFormValue = {...formData, content: e.target.value}
    setFormData(newFormValue)
  }
  
  const onFormSubmit = useCallback((e) => {
    console.log('onFormSubmit', formData);
    
    axios.post('/api/v1/posts', formData)
      .then(res => {
        // alert('done！')
      })
      .catch(err => {
        const error = err as AxiosError
        if (error.response) {
          // error
        }
      })
  }, [formData])

  return (
    <>
      <h1>文章</h1>
      <p>formData: {JSON.stringify(formData)}</p>
      <p>errors: {JSON.stringify(errors)}</p>

      <div style={{maxWidth: 280}}>
        <Form
          value={formData}
          fields={[
            { name: "title", label: "title", input: {type: 'text'} },
            { name: "content", label: "content", input: <textarea value={formData['content']} onChange={onTextareaChange.bind(null)}></textarea> },
          ]}
          onChange={onFormDataChange}
          onSubmit={onFormSubmit}
          errors={errors}
          footer={
            <Button type="submit" style={{marginRight: 20}}>上传</Button>
          }
        />
      </div>
    </>
  )
}

export default PostsNew
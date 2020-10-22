import { Form } from "components"
import { FormValue } from "miro-react-demo"
import React, { useCallback, useState } from "react"

type useFormOptions = {
  initFormData: FormValue;
  fields: Array<{
    name: string;
    label: string;
    input: { type: string };
  }>;
  buttons: React.ReactChild;
  submit: (params: FormValue)=>void
}

export function useForm(options: useFormOptions) {
  const [formData, setFormData] = useState<FormValue>(options.initFormData)
  const [errors, setErrors] = useState(() => {
    const e: { [K: string]: string[] } = {}
    Object.keys(options.initFormData).forEach(i => e[i] = [])
    return e
  })


  const onFormDataChange = useCallback(async (newValue: FormValue) => {
    setFormData(newValue)
  }, [errors])
  const onFormSubmit = useCallback((e) => {
    options.submit(formData)
  }, [formData])

  const fields = options.fields.map(field => {
    if(field.input.type === 'textarea'){
      return {
        ...field,
        input: <textarea value={formData['content']} onChange={(e)=>{
          const newFormValue = {...formData, content: e.target.value}
          setFormData(newFormValue)
        }}></textarea>
      }
    }else{
      return field
    }
  })
  
  const form = <Form
    value={formData}
    fields={fields}
    onChange={onFormDataChange}
    onSubmit={onFormSubmit}
    errors={errors}
    footer={options.buttons}
  />

  return {
    form,
    setErrors }
}
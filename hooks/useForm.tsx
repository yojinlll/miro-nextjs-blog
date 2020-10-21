import { Form } from "components"
import { Function } from "lodash"
import { FormValue } from "miro-react-demo"
import { FormInput } from "miro-react-demo/dist/lib/form/form"
import React, { useCallback, useState } from "react"

type useFormOptions = {
  initFormData: FormValue;
  fields: Array<{
    name: string;
    label: string;
    input: FormInput;
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

  const form = <Form
    value={formData}
    fields={options.fields}
    onChange={onFormDataChange}
    onSubmit={onFormSubmit}
    errors={errors}
    footer={options.buttons}
  />

  return {
    form,
    setErrors }
}
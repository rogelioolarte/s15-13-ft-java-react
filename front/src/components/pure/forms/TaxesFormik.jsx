import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useTaxeCreateMutation, useTaxeUpdateMutation } from '../../../store/apiSlice.js'
import { useTaxesActions } from '../../../hooks/useTaxesActions.js'

export function TaxesFormik ({ setOpen, action, taxeToEdit }) {
  const [taxeCreate] = useTaxeCreateMutation()
  const [taxeUpdate] = useTaxeUpdateMutation()

  const INPUT_BG = '#FFF8F8'

  const { useAddTaxe } = useTaxesActions()

  const taxeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    percentage: Yup.string().required('Percentage is required')

  })

  const initialValues = {
    name: taxeToEdit?.name ?? '',
    percentage: taxeToEdit?.percentage ?? ''
  }

  const createTaxe = async (values) => {
    await taxeCreate(values).unwrap()
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          useAddTaxe(res.data)
        }
      }).catch((error) => console.log(error))
  }

  const editTaxe = async (values) => {
    await taxeUpdate(values).unwrap()
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          useAddTaxe(res.data)
        }
      }).catch((error) => console.log(error))
  }

  const handleSubmit = async (values) => {
    console.log(values)
    action === 'create' && await createTaxe(values)
    action === 'edit' && await editTaxe(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={taxeSchema} onSubmit={handleSubmit}>

      {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
        <Form className='flex flex-col gap-2'>
          <fieldset className='flex flex-col gap-2'>
            {/* name */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='name'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Name' label='Name' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.name && touched.name
                ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name='name' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* percentage */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='percentage'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Percentage' label='Percentage' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.percentage && touched.percentage
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='percentage' component='div' />)
                : <div className='h-4' />}
            </div>
          </fieldset>
          <div className='flex justify-evenly gap-2'>
            <Button type='submit' className='bg-[#D1D4FA] text-gray-900'>
              Save
            </Button>
            <Button onClick={() => setOpen(false)} color='black'>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

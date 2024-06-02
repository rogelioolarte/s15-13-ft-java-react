import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useSupplierCreateMutation, useSupplierUpdateMutation } from '../../../store/apiSlice.js'
import { useSuppliersActions } from '../../../hooks/useSuppliersActions.js'

export function SuppliersFormik ({ setOpen, action, supplierToEdit }) {
  const [supplierCreate] = useSupplierCreateMutation()
  const [supplierUpdate] = useSupplierUpdateMutation()

  const INPUT_BG = '#FFF8F8'

  const { useAddSupplier } = useSuppliersActions()

  const supplierSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    cuit: Yup.string().required('Cuit is required')

  })

  const initialValues = {
    name: supplierToEdit?.name ?? '',
    cuit: supplierToEdit?.cuit ?? ''
  }

  const createSupplier = async (values) => {
    await supplierCreate(values).unwrap()
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          useAddSupplier(res.data)
        }
      }).catch((error) => console.log(error))
  }

  const editSupplier = async (values) => {
    await supplierUpdate(values).unwrap()
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          useAddSupplier(res.data)
        }
      }).catch((error) => console.log(error))
  }

  const handleSubmit = async (values) => {
    console.log(values)
    action === 'create' && await createSupplier(values)
    action === 'edit' && await editSupplier(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={supplierSchema} onSubmit={handleSubmit}>

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
            {/* cuit */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='cuit'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Cuit' label='Cuit' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.cuit && touched.cuit
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='cuit' component='div' />)
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

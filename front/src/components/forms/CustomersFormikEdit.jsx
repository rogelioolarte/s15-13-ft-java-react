import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { useUpdateCustomerMutation } from '../../store/apiSlice'
import { useCustomersActions } from '../../hooks/useCustomersActions'

export function CustomersFormikEdit ({ setOpen, setOpenMenu, action, customerToEdit }) {
  const [customerUpdate] = useUpdateCustomerMutation()

  const handleClose = () => {
    setOpen(false)
    setOpenMenu(false)
  }
  const INPUT_BG = '#FFF8F8'

  const { useUpdateCustomerById } = useCustomersActions()

  const customerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    personalCode: Yup.string().required('Code is required')
  })

  const initialValues = {
    name: customerToEdit?.name ?? '',
    personalCode: customerToEdit?.personalCode ?? ''
  }

  const editCustomer = async (values) => {
    await customerUpdate({ id: customerToEdit.id, data: values }).unwrap()
      .then((res) => {
        if (res) {
          useUpdateCustomerById({ id: customerToEdit.id, newData: res })
          toast.success('Customer updated successfully', { duration: 1500 })
          handleClose()
        }
      }).catch((error) => {
        if (error.data) {
          toast.error(`Error while adding: ${JSON.stringify(error.data.message)}`, { duration: 2000 })
        } else {
          toast.error(`Error while adding: ${JSON.stringify(error)}`, { duration: 2000 })
        }
      })
  }

  const handleSubmit = async (values) => {
    action === 'edit' && await editCustomer(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={customerSchema} onSubmit={handleSubmit}>

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
            {/* personalCode */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='personalCode'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Code' label='Code' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.personalCode && touched.personalCode
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='personalCode' component='div' />)
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

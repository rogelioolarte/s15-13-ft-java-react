import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useCustomersActions } from '../../hooks/useCustomersActions'
import { useCreateCustomerMutation, useUpdateCustomerMutation } from '../../store/apiSlice'
import { toast } from 'sonner'

export function CustomersFormik ({ setOpen, setOpenMenu, action, itemToEdit }) {
  const [customerCreate] = useCreateCustomerMutation()
  const [customerUpdate] = useUpdateCustomerMutation()

  const { useAddCustomer, useUpdateCustomerById } = useCustomersActions()
  const handleClose = () => {
    setOpen(false)
    if (setOpenMenu) {
      setOpenMenu(false)
    }
  }

  const INPUT_BG = '#FFF8F8'

  const customerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    personalCode: Yup.number()
      .required('Personal Code is required')
      .integer('Personal Code must be an integer')
      .test('is-valid-number', 'Personal Code must be a valid number with 8 digits', value => {
        return !isNaN(Number(value)) && Number(value) > 10000000 && Number(value) < 99999999
      }),
    customerType: Yup.string()
      .oneOf(['LEGAL', 'PHYSICAL'], 'Customer type must be either LEGAL or PHYSICAL')
      .required('Customer Type is required')
  })

  const initialValues = {
    name: itemToEdit?.name ?? '',
    personalCode: itemToEdit?.personalCode ?? '',
    customerType: itemToEdit?.customerType ?? ''
  }

  const createCustomer = async (values) => {
    await customerCreate(values).unwrap()
      .then((res) => {
        if (res) {
          useAddCustomer(res)
          toast.success('Customer created successfully',
            { duration: 1500, closeButton: true })
          handleClose()
        }
      }).catch((error) => {
        if (error.data) {
          toast.error(`Error while adding: ${JSON.stringify(error.data.message)}`,
            { duration: 2000, closeButton: true })
        } else {
          toast.error(`Error while adding: ${JSON.stringify(error)}`)
        }
      })
  }

  const editCustomer = async (values) => {
    await customerUpdate({ id: itemToEdit.id, data: values }).unwrap()
      .then((res) => {
        if (res) {
          useUpdateCustomerById({ id: itemToEdit.id, newData: res })
          toast.success('Customer updated successfully',
            { duration: 1500, closeButton: true })
          handleClose()
        }
      }).catch((error) => {
        if (error.data) {
          toast.error(`Error while editing: ${JSON.stringify(error.data.message)}`,
            { duration: 2000, closeButton: true })
        } else {
          toast.error(`Error while editing: ${JSON.stringify(error)}`)
        }
      })
  }

  const handleSubmit = async (values) => {
    action === 'create' && await createCustomer(values)
    action === 'edit' && await editCustomer(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={customerSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className='flex flex-col gap-2'>
          <fieldset className='flex flex-col gap-2'>
            {/* name */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='name'>
                {({ field }) => (
                  <Input {...field} error={errors.name && touched.name && true} type='text' placeholder='Name' label='Name' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.name && touched.name
                ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name='name' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* personalCode */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='personalCode'>
                {({ field }) => (
                  <Input {...field} error={errors.personalCode && touched.personalCode && true} type='number' placeholder='Personal Code' label='Personal Code' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.personalCode && touched.personalCode
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='personalCode' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* customerType */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='customerType'>
                {({ field }) => (
                  <Input {...field} error={errors.customerType && touched.customerType && true} type='text' placeholder='Customer Type' label='Customer Type' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.customerType && touched.customerType
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='customerType' component='div' />)
                : <div className='h-4' />}
            </div>
          </fieldset>
          <div className='flex justify-evenly gap-2'>
            <Button onClick={() => setOpen(false)} color='black' className='sm:w-[137px] h-[38px]'>
              Cancel
            </Button>
            <Button type='submit' className='bg-[#D1D4FA] text-gray-900 sm:w-[137px] h-[38px]'>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useTaxesActions } from '../../hooks/useTaxesActions.js'
import { useCreateTaxMutation, useUpdateTaxMutation } from '../../store/apiSlice.js'
import { toast } from 'sonner'

export function TaxesFormik ({ setOpen, setOpenMenu, action, itemToEdit }) {
  const [taxeCreate] = useCreateTaxMutation()
  const [updateTax] = useUpdateTaxMutation()

  const INPUT_BG = '#FFF8F8'

  const { useAddTax, useUpdateTaxById } = useTaxesActions()

  const handleClose = () => {
    setOpen(false)
    if (setOpenMenu) {
      setOpenMenu(false)
    }
  }

  const taxeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    percentage: Yup.number()
      .required('Percentage is required')
      .test('is-valid-percentage', 'Percentage must be a number and not exceed 50%', value => {
        return !isNaN(Number(value)) && Number(value) <= 50
      })
      .test('is-two-decimals', 'Percentage must have at most two decimal places', value => {
        if (value === undefined || value === null) return true
        return /^\d+(\.\d{1,2})?$/.test(value.toString())
      })
  })

  const initialValues = {
    name: itemToEdit?.name ?? '',
    percentage: itemToEdit?.percentage ?? ''
  }

  const createTax = async (values) => {
    await taxeCreate(values).unwrap()
      .then((res) => {
        if (res) {
          useAddTax(res)
          toast.success('Product updated successfully',
            { duration: 1500, closeButton: true })
          handleClose()
        }
      }).catch((error) => {
        if (error.data) {
          toast.error(`Error while adding: ${JSON.stringify(error.data.message)}`,
            { duration: 2000, closeButton: true })
        } else {
          console.error(`Error while adding: ${JSON.stringify(error)}`)
        }
      })
  }

  const editTax = async (values) => {
    await updateTax({ id: itemToEdit.id, data: values }).unwrap()
      .then((res) => {
        if (res) {
          useUpdateTaxById({ id: res.id, newData: res })
          toast.success('Product updated successfully',
            { duration: 1500, closeButton: true })
          handleClose()
        }
      }).catch((error) => {
        if (error.data) {
          toast.error(`Error while adding: ${JSON.stringify(error.data.message)}`,
            { duration: 2000, closeButton: true })
        } else {
          console.error(`Error while adding: ${JSON.stringify(error)}`)
        }
      })
  }

  const handleSubmit = async (values) => {
    action === 'create' && await createTax(values)
    action === 'edit' && await editTax(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={taxeSchema} onSubmit={handleSubmit}>
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
            {/* percentage */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='percentage'>
                {({ field }) => (
                  <Input {...field} error={errors.percentage && touched.percentage && true} type='number' placeholder='Percentage' label='Percentage' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.percentage && touched.percentage
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='percentage' component='div' />)
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

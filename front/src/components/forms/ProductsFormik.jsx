import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useProductsActions } from '../../hooks/useProductsActions.js'
import { useCreateProductMutation, useUpdateProductMutation } from '../../store/apiSlice.js'
import { toast } from 'sonner'

export function ProductsFormik ({ setOpen, setOpenMenu, action, itemToEdit }) {
  const [productCreate] = useCreateProductMutation()
  const [productUpdate] = useUpdateProductMutation()

  const handleClose = () => {
    setOpen(false)
    if (setOpenMenu) {
      setOpenMenu(false)
    }
  }

  const INPUT_BG = '#FFF8F8'

  const { useAddProduct, useUpdateProductById } = useProductsActions()

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    barcode: Yup.number()
      .required('BarCode is required')
      .integer('BarCode must be an integer')
      .test('is-valid-number', 'BarCode must be a valid number with 12 digits', value => {
        return !isNaN(Number(value)) && Number(value) > 100000000000 && Number(value) < 999999999999
      }),
    description: Yup.string().required('Description is required'),
    salePrice: Yup.number()
      .required('Price is required')
      .moreThan(0, 'Price must be greater than zero')
      .test('is-two-decimals', 'Price must have at most two decimal places', value => {
        if (value === undefined || value === null) return true
        return /^\d+(\.\d{1,2})?$/.test(value.toString())
      }),
    minimal: Yup.number()
      .required('Minimal Stock is required')
      .moreThan(0, 'Minimal Stock must be greater than zero')
      .integer('Minimal Stock must be an integer')
  })

  const initialValues = {
    name: itemToEdit?.name ?? '',
    barcode: itemToEdit?.barcode ?? '',
    description: itemToEdit?.description ?? '',
    salePrice: itemToEdit?.salePrice ?? '',
    minimal: itemToEdit?.minimal ?? ''
  }

  const createProduct = async (values) => {
    await productCreate(values).unwrap()
      .then((res) => {
        if (res) {
          useAddProduct(res)
          toast.success('Product created successfully',
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

  const editProduct = async (values) => {
    await productUpdate({ id: itemToEdit.id, data: values }).unwrap()
      .then((res) => {
        if (res) {
          useUpdateProductById({ id: res.id, newData: res })
          toast.success('Product updated successfully',
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
    // Convert the stock, salePrice, and minimal values to numbers
    const updatedValues = {
      ...values,
      salePrice: Number(values.salePrice),
      minimal: Number(values.minimal)
    }
    action === 'create' && await createProduct(updatedValues)
    action === 'edit' && await editProduct(updatedValues)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={productSchema} onSubmit={handleSubmit}>
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
            {/* barcode */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='barcode'>
                {({ field }) => (
                  <Input {...field} error={errors.barcode && touched.barcode && true} type='number' placeholder='Barcode' label='Barcode' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.barcode && touched.barcode
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='barcode' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* description */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='description'>
                {({ field }) => (
                  <Input {...field} error={errors.description && touched.description && true} type='text' placeholder='Description' label='Description' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              <div className='h-4' />
            </div>
            {/* price */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='salePrice'>
                {({ field }) => (
                  <Input {...field} error={errors.salePrice && touched.salePrice && true} type='number' placeholder='Price' label='Price' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.salePrice && touched.salePrice
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='salePrice' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* minimal */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='minimal'>
                {({ field }) => (
                  <Input {...field} error={errors.minimal && touched.minimal && true} type='number' placeholder='Minimal Stock' label='Minimal Stock' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.minimal && touched.minimal
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='minimal' component='div' />)
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

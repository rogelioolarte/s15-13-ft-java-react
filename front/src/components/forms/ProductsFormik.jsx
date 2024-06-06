import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useProductsActions } from '../../hooks/useProductsActions.js'
import { useCreateProductMutation, useUpdateProductMutation } from '../../store/apiSlice.js'
import { toast } from 'sonner'

export function ProductsFormik ({ setOpen, setOpenMenu, action, productToEdit }) {
  const [productCreate] = useCreateProductMutation()
  const [productUpdate] = useUpdateProductMutation()

  const handleClose = () => {
    setOpen(false)
    setOpenMenu(false)
  }
  const INPUT_BG = '#FFF8F8'

  const { useAddProduct, useUpdateProductById } = useProductsActions()

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    barcode: Yup.string().required('Barcode is required'),
    description: Yup.string().required('Description is required'),
    salePrice: Yup.number().required('Price is required').typeError('Price must be a number'),
    minimal: Yup.number().required('Minimal Stock is required').typeError('Minimal Stock must be a number')
    /* stock: Yup.number().required('Stock is required').typeError('Stock must be a number') */
  })

  const initialValues = {
    name: productToEdit?.name ?? '',
    barcode: productToEdit?.barcode ?? '',
    description: productToEdit?.description ?? '',
    salePrice: productToEdit?.salePrice ?? 0,
    minimal: productToEdit?.minimal ?? 0
    /* stock: productToEdit?.stock ?? 0 */
  }

  const createProduct = async (values) => {
    const updatedValues = { ...values, stock: 0 }
    await productCreate(updatedValues).unwrap()
      .then((res) => {
        console.log(res)
        if (res) {
          useAddProduct(res)
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

  const editProduct = async (values) => {
    const updatedValues = { ...values, stock: productToEdit.stock }
    await productUpdate({ id: productToEdit.id, data: updatedValues }).unwrap()
      .then((res) => {
        console.log(res)
        if (res) {
          useUpdateProductById({ id: productToEdit.id, data: res })
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
    // Convert the stock, salePrice, and minimal values to numbers
    const updatedValues = {
      ...values,
      stock: Number(values.stock),
      salePrice: Number(values.salePrice),
      minimal: Number(values.minimal)
    }

    console.log(updatedValues)
    action === 'create' && await createProduct(updatedValues)
    action === 'edit' && await editProduct(updatedValues)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={productSchema} onSubmit={handleSubmit}>

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
            {/* barcode */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='barcode'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Barcode' label='Barcode' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.barcode && touched.barcode
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='barcode' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* description */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='description'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Description' label='Description' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              <div className='h-4' />
            </div>
            {/* price */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='salePrice'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Price' label='Price' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.salePrice && touched.salePrice
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='salePrice' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* minimal */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='minimal'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Minimal Stock' label='Minimal Stock' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.minimal && touched.minimal
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='minimal' component='div' />)
                : <div className='h-4' />}
            </div>
            {/* stock */}
            {/* <div className='text-white text-sm text-center'>{CommonError.toUpperCase()}</div> */}
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

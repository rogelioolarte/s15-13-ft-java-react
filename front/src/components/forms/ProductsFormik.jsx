import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useProductsActions } from '../../hooks/useProductsActions.js'
import { useCreateProductMutation, useUpdateProductMutation } from '../../store/apiSlice.js'

export function ProductsFormik ({ setOpen, action, productToEdit }) {
  const [productCreate] = useCreateProductMutation()
  const [productUpdate] = useUpdateProductMutation()

  const INPUT_BG = '#FFF8F8'

  const { useAddProduct } = useProductsActions()

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    barcode: Yup.string().required('Barcode is required'),
    description: Yup.string(),
    price: Yup.string().required('Price is required'),
    minimal: Yup.string().required('Minimal Stock is required'),
    stock: Yup.string().required('Stock is required')

  })

  const initialValues = {
    name: productToEdit?.name ?? '',
    barcode: productToEdit?.barCode ?? '',
    description: productToEdit?.description ?? '',
    price: productToEdit?.precioVenta ?? '',
    minimal: productToEdit?.minimal ?? '',
    stock: productToEdit?.stock ?? ''
  }

  const createProduct = async (values) => {
    await productCreate(values).unwrap()
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          useAddProduct(res.data)
        }
      }).catch((error) => console.log(error))
  }

  const editProduct = async (values) => {
    await productUpdate(values).unwrap()
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          useAddProduct(res.data)
        }
      }).catch((error) => console.log(error))
  }

  const handleSubmit = async (values) => {
    console.log(values)
    action === 'create' && await createProduct(values)
    action === 'edit' && await editProduct(values)
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
              <Field name='price'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Price' label='Price' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.price && touched.price
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='price' component='div' />)
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
            <div className='flex flex-col gap-[2px]'>
              <Field name='stock'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Stock' label='Stock' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.stock && touched.stock
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='stock' component='div' />)
                : <div className='h-4' />}
            </div>
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

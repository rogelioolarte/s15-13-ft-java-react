import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useProductCreateMutation, useProductUpdateMutation } from '../../../store/apiSlice.js'
import { useProductsActions } from '../../../hooks/useProductsActions.js'

export function ProductsFormik ({ setOpen, action, productToEdit }) {
  const [productCreate] = useProductCreateMutation()
  const [productUpdate] = useProductUpdateMutation()

  const INPUT_BG = '#FFF8F8'

  const { useAddProduct } = useProductsActions()

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    supplier: Yup.string().required('Supplier is required'),
    barcode: Yup.string().required('Barcode is required'),
    price: Yup.string().required('Price is required'),
    quantity: Yup.string().required('Quantity is required')

  })

  const initialValues = {
    name: productToEdit?.name ?? '',
    description: productToEdit?.description ?? '',
    supplier: productToEdit?.supplier ?? '',
    barcode: productToEdit?.barCode ?? '',
    price: productToEdit?.precioVenta ?? '',
    quantity: productToEdit?.stockMinimo ?? ''
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
            {/* description */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='description'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Description' label='Description' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              <div className='h-4' />
            </div>
            {/* supplier */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='supplier'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Supplier' label='Supplier' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.supplier && touched.supplier
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='supplier' component='div' />)
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
            {/* quantity */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='quantity'>
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type='text' placeholder='Quantity' label='Quantity' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.quantity && touched.quantity
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='quantity' component='div' />)
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

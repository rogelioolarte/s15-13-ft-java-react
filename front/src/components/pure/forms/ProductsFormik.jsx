import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Card, CardBody, CardFooter, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useProductCreateMutation, useProductUpdateMutation } from '../../../store/apiSlice.js'
import { useProductsActions } from '../../../hooks/useProductsActions.js'

export function ProductsFormik ({ setOpen, action, productToEdit }) {
  const [productCreate] = useProductCreateMutation()
  const [productUpdate] = useProductUpdateMutation()

  const INPUT_BG = '#FFF8F8'

  const { useAddProduct } = useProductsActions()

  const productSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string(),
    supplier: Yup.string().required('Supplier is required'),
    barcode: Yup.string().required('Barcode is required'),
    price: Yup.string().required('Price is required'),
    quantity: Yup.string()
      .required('quantity is required')

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
        <Form className='grid justify-items-center p-8'>
          <Card className='w-full text-white shadow-none'>
            <CardBody className='flex flex-col gap-6'>
              <h1 className='text-black font-bold text-2xl'>New Product</h1>
              <div className='flex flex-col gap-10 '>
                <Field name='name'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='text' placeholder='Name' label='Name' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                  )}
                </Field>
                <Field name='description'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='text' placeholder='Description' label='Description' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                  )}
                </Field>
                <Field name='supplier'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='text' placeholder='Supplier' label='Supplier' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                  )}
                </Field>
                <Field name='barcode'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='text' placeholder='Barcode' label='Barcode' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                  )}
                </Field>
                <Field name='price'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='text' placeholder='Price' label='Price' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                  )}
                </Field>
                <Field name='quantity'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='text' placeholder='Quantity' label='Quantity' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                  )}
                </Field>
                {errors.name && touched.name &&
                  (<ErrorMessage className='text-black text-sm' name='name' component='div' />)}
                {errors.price && touched.price &&
                  (<ErrorMessage className='text-black text-sm' name='price' component='div' />)}
                {errors.provider && touched.provider &&
                  (<ErrorMessage className='text-black text-sm' name='provider' component='div' />)}
                {errors.quantity && touched.quantity &&
                  (<ErrorMessage className='text-black text-sm' name='quantity' component='div' />)}
                {/* <div className='text-white text-sm text-center'>{CommonError.toUpperCase()}</div> */}
              </div>
            </CardBody>
            <CardFooter className='flex justify-center gap-20'>
              <Button type='submit' variant='filled' className='bg-secondary-40 text-black'>
                Save
              </Button>
              <Button onClick={() => setOpen(false)} variant='filled' color='black'>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  )
}

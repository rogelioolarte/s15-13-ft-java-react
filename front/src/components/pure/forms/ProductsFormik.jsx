import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Card, CardBody, CardFooter, Input } from '@material-tailwind/react'
import * as Yup from 'yup'

export function ProductsFormik({ setOpen }) {
  const productSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    quantity: Yup.string()
      .required('quantity is required'),
    provider: Yup.string(),
    price: Yup.string(),

  })

  const initialValues = {
    name: '',
    quantity: '',
    provider: '',
    price: '',
  }

  const handleSubmit = async (values) => {
    console.log(values)
    // await login(values).unwrap()
    //   .then((res) => {
    //     if (useCheckRealUser(res)) {
    //       useSetUser(res)
    //       navigate('/dashboard')
    //     }
    //   }).catch((error) => sendError(error))
  }

  return (
    <Formik initialValues={initialValues} validationSchema={productSchema} onSubmit={handleSubmit}>
      {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
        <Form className='grid justify-items-center p-8'>
          <Card className='w-full text-white shadow-none'>
            <CardBody className='flex flex-col gap-6'>
              <h1 className={'text-black font-bold text-2xl'}>New Product</h1>
              <div className={'flex flex-col gap-10 '}><Field name="name">
                {({ field /* { name, value, onChange, onBlur } */ }) => (
                  <Input {...field} type="text" placeholder="Name" label="Name" size="lg"/>
                )}
              </Field>
                <Field name="price">
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type="text" placeholder="Price" label="Price" size="lg"/>
                  )}
                </Field>
                <Field name="provider">
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type="text" placeholder="Provider" label="Provider" size="lg"/>
                  )}
                </Field>
                <Field name="quantity">
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type="text" placeholder="Quantity" label="Quantity" size="lg"/>
                  )}
                </Field>
                {errors.name && touched.name &&
                  (<ErrorMessage className="text-black text-sm" name="name" component="div"/>)}
                {errors.price && touched.price &&
                  (<ErrorMessage className="text-black text-sm" name="price" component="div"/>)}
                {errors.provider && touched.provider &&
                  (<ErrorMessage className="text-black text-sm" name="provider" component="div"/>)}
                {errors.quantity && touched.quantity &&
                  (<ErrorMessage className="text-black text-sm" name="quantity" component="div"/>)}
                {/*<div className='text-white text-sm text-center'>{CommonError.toUpperCase()}</div>*/}</div>
            </CardBody>
            <CardFooter className={'flex justify-center gap-20'}>
              <Button type='submit' variant='filled' className={'bg-secondary-40 text-black'}>
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
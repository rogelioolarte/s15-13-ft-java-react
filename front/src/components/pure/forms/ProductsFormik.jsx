import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Card, CardBody, CardFooter, Input } from '@material-tailwind/react'
import * as Yup from 'yup'

export function ProductsFormik({ setOpen }) {
  let initialCredentials

  const productSchema = Yup.object().shape({
    name: Yup.string()
      .email('Invalid Email Format')
      .required('Email is required'),
    quantity: Yup.string()
      .required('Password is required'),
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
        <Form className='grid justify-items-center'>
          <Card className='w-full text-white'>
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
                {/* Email Errors */}
                {errors.email && touched.email &&
                  (<ErrorMessage className="text-white text-sm" name="email" component="div"/>)}
                {/* Password Errors */}
                {errors.password && touched.password &&
                  (<ErrorMessage className="text-white text-sm" name="password" component="div"/>)}
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
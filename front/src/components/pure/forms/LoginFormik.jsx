import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/authService'
import LogoMedium from '../../../assets/logo-md.svg'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email Format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
})

export default function LoginFormik () {
  const navigate = useNavigate()
  const [CommonError, setError] = useState('')

  const sendError = (error) => {
    setError(error)
  }

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 4000)
  }, [CommonError])

  const initialCredentials = {
    email: '',
    password: ''
  }

  const handleSubmit = async (values) => {
    const user = await login(values.email, values.password, sendError)
    if (user) {
      navigate('/home')
      console.log(user)
    }
  }

  return (
    <div className='w-[100%] md:w-[50%] md:h-[100%] bg-black grid justify-items-center'>
      <img src={LogoMedium} alt='logo-md' className='w-[45vh] mt-[5vh]' />
      <Typography variant='h3' color='white'>Log in to  Stock Master!</Typography>
      <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
          <Form className='grid justify-items-center bg-black mb-[15vh]'>
            <Card className='w-96 bg-black text-white'>
              <CardBody className='flex flex-col gap-2 h-40 '>
                <Field name='email'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='email' placeholder='Email' label='Email' size='lg' />
                  )}
                </Field>
                <Field name='password'>
                  {({ field /* { name, value, onChange, onBlur } */ }) => (
                    <Input {...field} type='password' placeholder='Password' label='Password' size='lg' />
                  )}
                </Field>
                {/* Email Errors */}
                {errors.email && touched.email &&
                (<ErrorMessage className='text-white text-sm' name='email' component='div' />)}
                {/* Password Errors */}
                {errors.password && touched.password &&
                (<ErrorMessage className='text-white text-sm' name='password' component='div' />)}
                <div className='text-white text-sm text-center'>{CommonError.toUpperCase()}</div>
              </CardBody>
              <CardFooter className='pt-0 mt-5'>
                <Button type='submit' variant='filled' fullWidth color='black'>
                  Sign in!
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  )
}

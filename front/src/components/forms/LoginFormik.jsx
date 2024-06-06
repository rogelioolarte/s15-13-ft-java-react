import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import LogoMedium from '../../assets/logo-md.svg'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useLoginMutation } from '../../store/apiSlice'
import { useUserActions } from '../../hooks/useUserActions'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email Format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
})

export default function LoginFormik() {
  const navigate = useNavigate()
  const [CommonError, setError] = useState('')
  const [login] = useLoginMutation()
  const { useCheckRealUser, useSetUser } = useUserActions()

  const sendError = (error) => {
    setError(error.data ? error.data.message : 'Login failed')
  }

  useEffect(() => {
    if (CommonError) {
      const timer = setTimeout(() => {
        setError('')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [CommonError])

  const initialCredentials = {
    email: '',
    password: ''
  }

  const handleSubmit = async (values) => {
    try {
      const res = await login(values).unwrap()
      if (useCheckRealUser(res)) {
        useSetUser(res)
        navigate('/dashboard')
      }
    } catch (error) {
      sendError(error)
    }
  }

  return (
    <div className='w-full md:w-1/2 h-full bg-black grid justify-items-center px-4 py-8'>
      <Link to='/home'><img src={LogoMedium} alt='logo-md' className='w-[45vh]' /></Link>
      <Typography className='text-center' variant='h3' color='white'>Log in to Stock Master!</Typography>
      <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ touched, errors }) => (
          <Form className='w-full grid justify-items-center'>
            <Card className='max-w-96 w-full bg-black text-white h-[100%]'>
              <CardBody className='flex flex-col gap-2 h-40'>
                <div className='flex flex-col gap-[2px]'>
                  <Field name='email'>
                    {({ field }) => (
                      <Input error={errors.email && touched.email && true} color='white' {...field} type='email' placeholder='Email' label='Email' size='lg' />
                    )}
                  </Field>
                  {/* Email Errors */}
                  {errors.email && touched.email
                    ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='email' component='div' />)
                    : <div className='h-4' />}
                </div>
                <div className='flex flex-col gap-[2px]'>
                  <Field name='password'>
                    {({ field }) => (
                      <Input error={errors.password && touched.password && true} color='white' {...field} type='password' placeholder='Password' label='Password' size='lg' />
                    )}
                  </Field>
                  {/* Password Errors */}
                  {errors.password && touched.password
                    ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='password' component='div' />)
                    : <div className='h-4' />}
                </div>
                {CommonError && (
                  <div className='text-white text-sm text-center'>{CommonError}</div>
                )}
              </CardBody>
              <CardFooter className='pt-0 mt-5'>
                <Button type='submit' variant='filled' fullWidth color='white'>
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

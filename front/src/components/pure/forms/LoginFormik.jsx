import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/authService'
import LogoMedium from '../../../assets/logo-md.svg'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email Format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
})

export default function LoginFormik () {
  const navigate = useNavigate()

  const sendError = (error) => {
    navigate(`/error?message=${encodeURIComponent(error)}`)
  }

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
    <div className='w-[50%] h-[100%] bg-black text-white grid justify-items-center'>
      <img src={LogoMedium} alt='logo-md' className='w-[41%] mt-[2%]' />
      <h2 className='text-[1.9rem] font-bold'>Log in to  Stock Master!</h2>
      <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
          <Form className='grid justify-items-center bg-black mb-[17%]'>
            <Field
              id='email'
              type='email'
              name='email'
              placeholder='Email'
              className='p-[0.4rem] rounded-[0.2rem]'
            />
            {/* Email Errors */}
            {errors.email && touched.email && (<ErrorMessage name='email' component='div' />)}
            <Field
              id='password'
              name='password'
              placeholder='Password'
              type='password'
              className='p-[0.4rem] rounded-[0.2rem] mt-[5%]'
            />
            {/* Password Errors */}
            {errors.password && touched.password && (<ErrorMessage name='password' component='div' />)}
            <button
              type='submit'
              className='bg-[#6C757D] text-white
                text-[0.9rem] font-bold p-[0.5rem] mt-[5%] rounded-[0.2rem] w-[80%]'
            >
              Sign in!
            </button>
            {/* {isSubmitting ? (<p>Login your credentials...</p>) : null} */}
          </Form>
        )}
      </Formik>
    </div>
  )
}

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/authService'

export default function LoginFormik () {
  const navigate = useNavigate()

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  })

  const handleSubmit = async (values) => {
    const user = await login(values.email, values.password)
    if (user) {
      navigate('/home')
      console.log(user)
    }
  }

  const initialCredentials = {
    email: '',
    password: ''
  }

  return (
    <div>
      <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <label htmlFor='email'>Email</label>
            <Field id='email' type='email' name='email' placeholder='example@email.com' />
            {/* Email Errors */}
            {errors.email && touched.email && (<ErrorMessage name='email' component='div' />)}

            <label htmlFor='password'>Password</label>
            <Field id='password' name='password' placeholder='password' type='password' />
            {/* Password Errors */}
            {errors.password && touched.password && (<ErrorMessage name='password' component='div' />)}
            <button type='submit'>Login</button>
            {isSubmitting ? (<p>Login your credentials...</p>) : null}
          </Form>
        )}
      </Formik>
    </div>
  )
}

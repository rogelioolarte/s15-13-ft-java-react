import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  search: Yup.string()
    .required('Search term is required')
})

export default function SearchBar () {
  const initialCredentials = {
    search: ''
  }

  const handleSubmit = async (values) => {
    /* const search = await search(values.search)
    if (search) {
      console.log(search)
    } */
    console.log(values.search)
  }

  return (
    <div>
      <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
          <Form className='grid grid-flow-row auto-rows-max md:grid-flow-col
            md:auto-cols-max items-center justify-between justify-items-center '
          >
            {/* Email Errors */}
            {errors.search && touched.search &&
              (<ErrorMessage
                className='text-[0.8rem] h-[50%] mr-[0.5rem] '
                name='search'
                component='div'
               />)}
            <Field
              id='search'
              type='text'
              name='search'
              placeholder='Search'
              className='p-[0.4rem] rounded-[0.3rem]
              border-2 border-solid border-[#D6D6D6]'
            />
            <button
              type='submit'
              className='bg-[#85A7BF] text-black text-[0.9rem] font-bold
              rounded-[0.3rem] p-[0.5rem] md:w-[100%] w-[40%]'
            >
              {'>>'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

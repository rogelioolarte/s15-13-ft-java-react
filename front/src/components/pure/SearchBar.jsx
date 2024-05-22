const loginSchema = Yup.object().shape({
    searhc: Yup.string()
      .required('Email is required')
  })

export default function SearchBar() {
    const initialCredentials = {
        search: '',
      }
    
      const handleSubmit = async (values) => {
        const search = await search(values.search)
        if (search) {
          console.log(search)
        }
    }

  return (
    <div>
        <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
          <Form className='grid justify-items-center bg-black mb-[15vh]'>
            <Field
              id='search'
              type='search'
              name='search'
              placeholder='search'
              className='p-[0.4rem] rounded-[0.2rem]'
            />
            {/* Search Errors */}
            {errors.search && touched.search && (<ErrorMessage name='search' component='div' />)}
            <button
              type='submit'
              className='bg-[#6C757D] text-white
                text-[0.9rem] font-bold p-[0.5rem] mt-[5%] rounded-[0.2rem] w-[80%]'
            >
              Sign in!
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  Button,
  Input
} from '@material-tailwind/react'
import LensIcon from '../LensIcon'
import { useEffect, useState } from 'react'

const loginSchema = Yup.object().shape({
  search: Yup.string()
    .required('Search term is required')
})

export default function SearchBar() {
  const [errorVisible, setErrorVisible] = useState(false)

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

  useEffect(() => {
    if (errorVisible) {
      setTimeout(() => {
        setErrorVisible(false)
      }, 4000)
    }
  }, [errorVisible])

  return (
    <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({ touched, errors, setFieldTouched }) => (
        <Form className='flex flex-col md:flex-row items-center justify-end gap-2'>
          {/* Search Errors */}
          {errors.search && touched.search && errorVisible &&
            (<ErrorMessage
              className='text-[0.8rem] h-[50%] mr-[0.5rem] w-full flex'
              name='search'
              component='div'
            />)
          }
          <Field
            name='search'
          >
            {({ field }) => (
              <div className='relative flex w-full max-w-[236px] gap-2 flex-grow'>
                <Input
                  {...field}
                  type='search'
                  placeholder='Search'
                  className='placeholder:text-blue-gray-300 border-blue-gray-300 focus:border-black focus:border-t-black focus:border'
                  labelProps={{
                    className: 'before:content-none after:content-none'
                  }}
                  onFocus={() => {
                    setFieldTouched('search', true)
                    if (errors.search) {
                      setErrorVisible(true)
                    }
                  }}
                />
                <LensIcon />
              </div>
            )}
          </Field>
          <Button type='submit' size='md' className='rounded-lg '>
            Search
          </Button>
        </Form>
      )}
    </Formik>
  )
}

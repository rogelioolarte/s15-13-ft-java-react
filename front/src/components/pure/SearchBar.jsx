import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  Button,
  Input
} from '@material-tailwind/react'
import LensIcon from '../pure/LensIcon'
import { useEffect, useState } from 'react'

const loginSchema = Yup.object().shape({
  search: Yup.string()
    .required('Search term is required')
})

export default function SearchBar () {
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
    <div>
      <Formik initialValues={initialCredentials} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ touched, errors, setFieldTouched }) => (
          <Form className='items-center gap-x-2 sm:flex'>
            {/* Search Errors */}
            {errors.search && touched.search && errorVisible &&
              (<ErrorMessage
                className='text-[0.8rem] h-[50%] mr-[0.5rem] '
                name='search'
                component='div'
               />)}
            <Field
              name='search'
            >
              {({ field }) => (
                <div className='relative flex w-full gap-2 md:w-max'>
                  <Input
                    {...field}
                    type='search'
                    placeholder='Search'
                    containerProps={{
                      className: 'min-w-[288px]'
                    }}
                    className=' !border-t-blue-gray-300 pl-9
                      placeholder:text-blue-gray-300 focus:!border-blue-gray-300'
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
    </div>
  )
}

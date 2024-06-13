import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Input } from '@material-tailwind/react'
import { IoSearchSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { useTaxesActions } from '../../hooks/useTaxesActions'
import { useSuppliersActions } from '../../hooks/useSuppliersActions'
import { useProductsActions } from '../../hooks/useProductsActions'
import { useCustomersActions } from '../../hooks/useCustomersActions'
import { useNavigate } from 'react-router-dom'

const searchSchema = Yup.object().shape({
  search: Yup.string()
    .required('Search term is required')
})

/**
 * Unstable Search Bar
 */
export default function SearchBar () {
  const [errorVisible, setErrorVisible] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const { taxes } = useTaxesActions()
  const { suppliers } = useSuppliersActions()
  const { products } = useProductsActions()
  const { customers } = useCustomersActions()
  const navigate = useNavigate()

  const initialCredentials = {
    search: ''
  }

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      return
    }
    const lowercasedTerm = searchTerm.toLowerCase()
    const results = []
    // Filtrar resultados
    results.push(
      ...taxes.filter(tax => tax.name.toLowerCase().includes(lowercasedTerm)),
      ...suppliers.filter(supplier => supplier.name.toLowerCase().includes(lowercasedTerm)),
      ...products.filter(product => product.name.toLowerCase().includes(lowercasedTerm)),
      ...customers.filter(customer => customer.name.toLowerCase().includes(lowercasedTerm))
    )
    setSearchResults(results)
  }

  const handleSubmit = async (values) => {
    handleSearch(values.search)
  }

  useEffect(() => {
    if (errorVisible) {
      setTimeout(() => {
        setErrorVisible(false)
      }, 4000)
    }
  }, [errorVisible])

  const handleResultClick = (result) => {
    if (result.percentage) navigate('/taxes')
    if (result.companyCode) navigate('/suppliers')
    if (result.barcode) navigate('/products')
    if (result.customerType) navigate('/customers')
  }

  return (
    <Formik initialValues={initialCredentials} validationSchema={searchSchema} onSubmit={handleSubmit}>
      {({ touched, errors, setFieldTouched }) => (
        <Form className='relative flex flex-col md:flex-row items-center justify-end gap-2'>
          {/* Search Errors */}
          {errors.search && touched.search && errorVisible &&
            (
              <ErrorMessage
                className='text-[0.8rem] h-[50%] mr-[0.5rem] w-full flex'
                name='search'
                component='div'
              />
            )}
          <Field name='search'>
            {({ field }) => (
              <div className='relative flex w-full md:min-w-[236px] md:max-w-[236px] gap-2 flex-grow'>
                <Input
                  {...field}
                  type='search'
                  placeholder='Search'
                  className='!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                  onFocus={() => {
                    setFieldTouched('search', true)
                    if (errors.search) {
                      setErrorVisible(true)
                    }
                  }}
                  onChange={(e) => handleSearch(e.target.value)}
                  icon={<IoSearchSharp />}
                />
                {searchResults.length > 0 && (
                  <div className='absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-[50vh]'>
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className='p-2 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleResultClick(result)}
                      >
                        {result.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Field>
          {/* <Button type='submit' size='md' className='rounded-lg'>
            Search
          </Button> */}
        </Form>
      )}
    </Formik>
  )
}

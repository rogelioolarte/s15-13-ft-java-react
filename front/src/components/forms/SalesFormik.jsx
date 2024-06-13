import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { useCreateSaleMutation } from '../../store/apiSlice'
import { useProductsActions } from '../../hooks/useProductsActions'
import { useCustomersActions } from '../../hooks/useCustomersActions'
import { useTaxesActions } from '../../hooks/useTaxesActions'
import { useSalesActions } from '../../hooks/useSalesActions'
// import { BsFillPlusSquareFill, BsFillTrash3Fill } from 'react-icons/bs'
import { BsPlusSquare, BsTrash } from 'react-icons/bs'

export function SalesFormik ({ setOpen, setOpenMenu, action, itemToEdit }) {
  const [createSale] = useCreateSaleMutation()
  const { customers } = useCustomersActions()
  const { products } = useProductsActions()
  const { taxes } = useTaxesActions()
  const { useAddSale } = useSalesActions()

  const handleClose = () => {
    setOpen(false)
    if (setOpenMenu) {
      setOpenMenu(false)
    }
  }

  const INPUT_BG = '#FFF8F8'

  const invoiceSchema = Yup.object().shape({
    idcustomer: Yup.string().required('Customer is required'),
    date: Yup.date()
      .test('is-future-date', 'Date cannot be in the future', function (value) {
        const selectedDate = new Date(value)
        selectedDate.setDate(selectedDate.getDate() + 1)
        return selectedDate <= new Date()
      }).required('Date is required'),
    taxes: Yup.string().required('Taxes are required'),
    products: Yup.array().of(
      Yup.object().shape({
        product: Yup.string().required('Product is required'),
        quantity: Yup.number().required('Its is required')
          .integer('Must be an integer')
          .moreThan(0, 'Quantity must be greater than zero'),
        discount: Yup.number().required('Discount is required')
          .min(0, 'Cannot be negative')
          .test('is-two-decimals', 'Maximum two decimal places', value => {
            if (value === undefined || value === null) return true
            return /^\d+(\.\d{1,2})?$/.test(value.toString())
          }),
        discountType: Yup.string().oneOf(['%', '$'], 'Invalid discount type')
          .required('Discount type is required')
      })
    )
  })

  const initialValues = {
    idcustomer: itemToEdit?.idcustomer ?? '',
    date: itemToEdit?.date ?? '',
    taxes: itemToEdit?.taxes ?? '',
    products: itemToEdit?.products ?? [{ product: '', quantity: '', discount: '', discountType: '%' }]
  }

  const createInvoice = async (values) => {
    try {
      const idCustomer = values.idcustomer
        ? parseInt(customers.find(c => c.name === values.idcustomer.split(' - ')[0]).id)
        : null
      const idTaxes = values.taxes
        ? parseInt(taxes.find(t => t.name === values.taxes.split(' - ')[0]).id)
        : null
      const productsData = values.products.map(product => {
        const productData = products.find(p => p.name === product.product)
        const idProduct = productData ? parseInt(productData.id) : null
        const price = productData ? parseFloat(productData.salePrice) : 0
        const quantity = parseFloat(product.quantity)
        let discount = parseFloat(product.discount) || 0

        if (product.discountType === '%') {
          discount = (discount / 100) * (price * quantity)
        }

        const productPrice = (price * quantity) - discount

        return { idProduct, quantity, discount, productPrice }
      })

      const totalPrice = productsData.reduce((acc, product) => acc + product.productPrice, 0)

      const formattedValues = {
        id_customer: idCustomer,
        id_taxes: idTaxes,
        date: values.date,
        products: productsData,
        totalPrice
      }

      const response = await createSale(formattedValues).unwrap()
      if (response.product) {
        console.log('si hay product list')
        response.products = response.product
        delete response.product
      }
      useAddSale(response)
      toast.success('Invoice created successfully',
        { duration: 1500, closeButton: true })
      handleClose()
    } catch (error) {
      toast.error(`Error while adding: ${error.data
        ? JSON.stringify(error.data.message)
          : JSON.stringify(error)}`,
      { duration: 2000, closeButton: true })
    }
  }

  const handleSubmit = async (values) => {
    if (action === 'create') {
      await createInvoice(values)
    }
  }

  const addProductField = (setFieldValue, values) => {
    const newProductFields = [...values.products, { product: '', quantity: '', discount: '', discountType: '%' }]
    setFieldValue('products', newProductFields)
  }

  const removeProductField = (index, setFieldValue, values) => {
    const newProductFields = values.products.filter((_, i) => i !== index)
    setFieldValue('products', newProductFields)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={invoiceSchema} onSubmit={handleSubmit}>
      {({ errors, touched, values, setFieldValue }) => (
        <Form className='flex flex-col gap-2 w-full mx-auto'>
          <fieldset className='flex flex-col gap-2'>
            {/* date */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='date'>
                {({ field }) => (
                  <Input {...field} error={errors.date && touched.date} type='datetime-local' placeholder='yyyy/mm/dd' label='Date' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.date && touched.date ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name='date' component='div' />) : <div className='h-4' />}
            </div>
            {/* idcustomer */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='idcustomer'>
                {({ field }) => (
                  <Input
                    {...field}
                    error={errors.idcustomer && touched.idcustomer}
                    type='text'
                    placeholder='Customer'
                    label='Customer'
                    size='lg'
                    list='idcustomer-list'
                    className='bg-primary'
                    style={{ backgroundColor: INPUT_BG }}
                    onChange={(e) => setFieldValue('idcustomer', e.target.value)}
                  />
                )}
              </Field>
              <datalist id='idcustomer-list'>
                {customers.filter(c => c.name.toLowerCase().includes(values.idcustomer.toLowerCase())).map(customer => (
                  <option key={customer.id} value={`${customer.name} - ${customer.personalCode}`} />
                ))}
              </datalist>
              {errors.idcustomer && touched.idcustomer ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name='idcustomer' component='div' />) : <div className='h-4' />}
            </div>

            <fieldset className='flex flex-col gap-2 pt-1 overflow-auto' style={{ maxHeight: '10rem' }}>
              {values.products.map((field, index) => (
                <div key={index} className='flex gap-2 items-center'>
                  {/* product */}
                  <div className='flex flex-col gap-[2px] col-span-2 sm:col-auto'>
                    <Field name={`products[${index}].product`}>
                      {({ field }) => (
                        <div className='flex items-center gap-2'>
                          <Input
                            {...field}
                            error={errors.products?.[index]?.product && touched.products?.[index]?.product}
                            type='text'
                            placeholder='Product'
                            label='Product'
                            size='lg'
                            list={`product-list-${index}`}
                            className='bg-primary flex-grow'
                            style={{ backgroundColor: INPUT_BG }}
                            containerProps={{ className: 'min-w-[initial]' }}
                            onChange={(e) => setFieldValue(`products[${index}].product`, e.target.value)}
                          />
                        </div>
                      )}
                    </Field>
                    <datalist id={`product-list-${index}`}>
                      {products.filter(p => p.name.toLowerCase().includes(values?.products[index]?.product?.toLowerCase() || '')).map(product => (
                        <option key={product.id} value={`${product.name}`} />
                      ))}
                    </datalist>
                    {errors.products?.[index]?.product && touched.products?.[index]?.product ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name={`products[${index}].product`} component='div' />) : <div className='h-4' />}
                  </div>
                  {/* quantity */}
                  <div className='flex flex-col gap-[2px] col-span-2 sm:col-auto'>
                    <Field name={`products[${index}].quantity`}>
                      {({ field }) => (
                        <Input
                          {...field}
                          error={errors.products?.[index]?.quantity && touched.products?.[index]?.quantity}
                          type='number' placeholder='Quantity'
                          label='Quantity' size='lg'
                          className='bg-primary'
                          containerProps={{ className: 'min-w-[initial]' }}
                          style={{ backgroundColor: INPUT_BG }}
                        />
                      )}
                    </Field>
                    {errors.products?.[index]?.quantity && touched.products?.[index]?.quantity ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name={`products[${index}].quantity`} component='div' />) : <div className='h-4' />}
                  </div>
                  {/* discount */}
                  <div className='flex flex-col gap-[2px] flex-grow max-w-[150px]'>
                    <div className='flex gap-2'>
                      <Field name={`products[${index}].discount`}>
                        {({ field }) => (
                          <Input
                            {...field}
                            error={errors.products?.[index]?.discount && touched.products?.[index]?.discount}
                            type='number' placeholder='Discount'
                            label='Discount' size='lg'
                            className='bg-primary flex-grow'
                            containerProps={{ className: 'min-w-[initial]' }}
                            style={{ backgroundColor: INPUT_BG }}
                          />
                        )}
                      </Field>
                      <Field name={`products[${index}].discountType`} as='select' className='bg-primary p-2 rounded-md'>
                        <option value='%'>%</option>
                        <option value='$'>$</option>
                      </Field>
                    </div>
                    {errors.products?.[index]?.discount && touched.products?.[index]?.discount ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name={`products[${index}].discount`} component='div' />) : <div className='h-4' />}
                  </div>
                  {index > 0 && (
                    <BsTrash className='h-6 w-6 cursor-pointer mb-4 text-black' onClick={() => removeProductField(index, setFieldValue, values)} />
                  )}
                  {index >= 0 && (
                    <BsPlusSquare className='h-6 w-6 cursor-pointer mb-4 text-black' onClick={() => addProductField(setFieldValue, values)} />
                  )}
                </div>
              ))}
            </fieldset>
            {/* taxes */}
            <div className='flex flex-col gap-[2px] w-1/2'>
              <Field name='taxes'>
                {({ field }) => (
                  <Input
                    {...field}
                    error={errors.taxes && touched.taxes}
                    type='text'
                    placeholder='Taxes'
                    label='Taxes'
                    size='lg'
                    list='tax-list'
                    className='bg-primary'
                    style={{ backgroundColor: INPUT_BG }}
                    onChange={(e) => setFieldValue('taxes', e.target.value)}
                  />
                )}
              </Field>
              <datalist id='tax-list'>
                {taxes.filter(t => t.name.toLowerCase().includes(values.taxes.toLowerCase())).map(tax => (
                  <option role='menuitem' data-popover-target='nested-menu' key={tax.id} value={`${tax.name} - ${tax.percentage}%`} />
                ))}
              </datalist>
              {errors.taxes && touched.taxes ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name='taxes' component='div' />) : <div className='h-4' />}
            </div>
          </fieldset>

          {/* total */}
          <div className='flex flex-row gap-2'>
            <div>Total:</div>
            <div>{values.products.reduce((acc, curr) => {
              const productData = products.find(p => p.name === curr.product)
              const price = productData ? parseFloat(productData.salePrice) : 0
              let discount = parseFloat(curr.discount) || 0
              if (curr.discountType === '%') {
                discount = (discount / 100) * (price * curr.quantity)
              }
              return acc + ((price * curr.quantity) - discount)
            }, 0).toFixed(2)}
            </div>
          </div>

          <div className='flex justify-evenly gap-2'>
            <Button onClick={handleClose} color='black' className='sm:w-[137px] h-[38px]'>
              Cancel
            </Button>
            <Button type='submit' className='bg-[#D1D4FA] text-gray-900 sm:w-[137px] h-[38px]'>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

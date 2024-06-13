import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { useCreatePurchaseMutation } from '../../store/apiSlice'
import { useSuppliersActions } from '../../hooks/useSuppliersActions'
import { useProductsActions } from '../../hooks/useProductsActions'
// import { BsFillPlusSquareFill, BsFillTrash3Fill } from 'react-icons/bs'
import { BsPlusSquare, BsTrash } from 'react-icons/bs'
import { usePurchasesActions } from '../../hooks/usePurchasesActions'

export function PurchasesFormik ({ setOpen, setOpenMenu, action, itemToEdit }) {
  const [createPurchase] = useCreatePurchaseMutation()
  const { suppliers } = useSuppliersActions()
  const { products } = useProductsActions()
  const { useAddPurchase } = usePurchasesActions()

  const handleClose = () => {
    setOpen(false)
    if (setOpenMenu) {
      setOpenMenu(false)
    }
  }

  const INPUT_BG = '#FFF8F8'

  const invoiceSchema = Yup.object().shape({
    bill: Yup.number().required('Bill is required')
      .integer('BarCode must be an integer')
      .test('is-valid-number', 'Personal Code must be a valid number with 14 digits', value => {
        return !isNaN(Number(value)) && Number(value) > 10000000000000 && Number(value) < 99999999999999
      }),
    date: Yup.date()
      .test('is-future-date', 'Date cannot be in the future', function (value) {
        return new Date(value) <= new Date()
      }).required('Date is required'),
    supplier: Yup.string().required('Supplier is required'),
    productList: Yup.array().of(
      Yup.object().shape({
        product: Yup.string().required('Product is required'),
        quantity: Yup.number()
          .integer('Must be an integer')
          .moreThan(0, 'Quantity must be greater than zero')
          .required('Quantity is required')
      })
    )
  })

  const initialValues = {
    bill: itemToEdit?.bill ?? '',
    date: itemToEdit?.date ?? '',
    supplier: itemToEdit?.supplier ?? '',
    productList: itemToEdit?.productList ?? [{ product: '', quantity: '' }]
  }

  const createInvoice = async (values) => {
    const formattedValues = {
      bill: values.bill,
      date: values.date,
      supplier: parseInt(suppliers.find(s => s.name === values.supplier).id),
      productList: values.productList.map(product => ({
        id: parseInt(products.find(p => p.name === product.product).id),
        quantity: parseInt(product.quantity)
      }))
    }

    await createPurchase(formattedValues).unwrap()
      .then((res) => {
        if (res) {
          useAddPurchase(res)
          toast.success('Purchase created successfully',
            { duration: 1500, closeButton: true })
          handleClose()
        }
      }).catch((error) => {
        if (error.data) {
          toast.error(`Error while adding: ${JSON.stringify(error.data.message)}`,
            { duration: 2000, closeButton: true })
        } else {
          toast.error(`Error while adding: ${JSON.stringify(error)}`)
        }
      })
  }

  const handleSubmit = async (values) => {
    if (action === 'create') {
      await createInvoice(values)
    }
  }

  const addProductField = (setFieldValue, values) => {
    const newProductFields = [...values.productList, { product: '', quantity: 0 }]
    setFieldValue('productList', newProductFields)
  }

  const removeProductField = (index, setFieldValue, values) => {
    const newProductFields = values.productList.filter((_, i) => i !== index)
    setFieldValue('productList', newProductFields)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={invoiceSchema} onSubmit={handleSubmit}>
      {({ errors, touched, values, setFieldValue }) => (
        <Form className='flex flex-col gap-2 w-full mx-auto'>
          <fieldset className='flex flex-col gap-2'>
            {/* bill */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='bill'>
                {({ field }) => (
                  <Input {...field} error={errors.bill && touched.bill && true} type='number' placeholder='Bill' label='Bill' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.bill && touched.bill
                ? (
                  <ErrorMessage className='ml-2 text-red-600 text-xs' name='bill' component='div' />
                  )
                : (
                  <div className='h-4' />
                  )}
            </div>
            {/* date */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='date'>
                {({ field }) => (
                  <Input {...field} error={errors.date && touched.date && true} type='datetime-local' label='Date' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.date && touched.date
                ? (
                  <ErrorMessage className='ml-2 text-red-600 text-xs' name='date' component='div' />
                  )
                : (
                  <div className='h-4' />
                  )}
            </div>
            {/* supplier */}
            <div className='flex flex-col gap-[2px]'>
              <Field name='supplier'>
                {({ field }) => (
                  <Input
                    {...field}
                    error={errors.supplier && touched.supplier && true}
                    type='text'
                    placeholder='Supplier'
                    label='Supplier'
                    size='lg'
                    list='supplier-list'
                    className='bg-primary'
                    style={{ backgroundColor: INPUT_BG }}
                    onChange={(e) => setFieldValue('supplier', e.target.value)}
                  />
                )}
              </Field>
              <datalist id='supplier-list'>
                {suppliers.filter(s => s.name.toLowerCase().includes(values.supplier.toLowerCase())).map(supplier => (
                  <option key={supplier.id} value={`${supplier.name}`} />
                ))}
              </datalist>
              {errors.supplier && touched.supplier
                ? (
                  <ErrorMessage className='ml-2 text-red-600 text-xs' name='supplier' component='div' />
                  )
                : (
                  <div className='h-4' />
                  )}
            </div>

            <fieldset className='flex flex-col gap-2 pt-1 overflow-auto' style={{ maxHeight: '10rem' }}>
              {values.productList.map((field, index) => (
                <div key={index} className='flex gap-2 items-center'>
                  {/* product */}
                  <div className='flex flex-col gap-[2px] col-span-2 sm:col-auto'>
                    <Field name={`productList[${index}].product`}>
                      {({ field }) => (
                        <div className='flex items-center gap-2'>
                          <Input
                            {...field}
                            error={errors.productList?.[index]?.product && touched.productList?.[index]?.product && true}
                            type='text'
                            placeholder='Product'
                            label='Product'
                            size='lg'
                            list={`product-list-${index}`}
                            className='bg-primary flex-grow'
                            style={{ backgroundColor: INPUT_BG }}
                            containerProps={{
                              className: 'min-w-[initial]'
                            }}
                            onChange={(e) => setFieldValue(`productList[${index}].product`, e.target.value)}
                          />
                        </div>
                      )}
                    </Field>
                    <datalist id={`product-list-${index}`}>
                      {products.filter(p => p.name.toLowerCase().includes(values?.productList[index]?.product?.toLowerCase() || '')).map(product => (
                        <option key={product.id} value={`${product.name}`} />
                      ))}
                    </datalist>
                    {errors.productList?.[index]?.product && touched.productList?.[index]?.product
                      ? (
                        <ErrorMessage className='ml-2 text-red-600 text-xs' name={`productList[${index}].product`} component='div' />
                        )
                      : (
                        <div className='h-4' />
                        )}
                  </div>
                  {/* quantity */}
                  <div className='flex flex-col gap-[2px] col-span-2 sm:col-auto'>
                    <Field name={`productList[${index}].quantity`}>
                      {({ field }) => (
                        <Input
                          {...field}
                          error={errors.productList?.[index]?.quantity && touched.productList?.[index]?.quantity && true}
                          type='number' placeholder='Quantity'
                          label='Quantity' size='lg'
                          className='bg-primary'
                          containerProps={{
                            className: 'min-w-[initial]'
                          }}
                          style={{ backgroundColor: INPUT_BG }}
                        />
                      )}
                    </Field>
                    {errors.productList?.[index]?.quantity && touched.productList?.[index]?.quantity
                      ? (
                        <ErrorMessage className='ml-2 text-red-600 text-xs' name={`productList[${index}].quantity`} component='div' />
                        )
                      : (
                        <div className='h-4' />
                        )}
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
          </fieldset>

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

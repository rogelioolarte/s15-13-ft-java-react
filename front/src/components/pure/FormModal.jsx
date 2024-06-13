import { forwardRef, cloneElement, useState } from 'react'
import { Dialog, DialogBody } from '@material-tailwind/react'
import { SuppliersFormik } from '../forms/SuppliersFormik'
import { CustomersFormik } from '../forms/CustomerFormik'
import { ProductsFormik } from '../forms/ProductsFormik'
import { SalesFormik } from '../forms/SalesFormik'
import { TaxesFormik } from '../forms/TaxesFormik'
import { PurchasesFormik } from '../forms/PurchasesFormik'

const FormModal = forwardRef(({ button, action, itemToEdit, setOpenMenu, formType }, ref) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const Formik = () => {
    switch (formType) {
      case 'Supplier':
        return <SuppliersFormik setOpen={handleOpen} setOpenMenu={setOpenMenu} action={action} itemToEdit={itemToEdit} />
      case 'Customer':
        return <CustomersFormik setOpen={handleOpen} setOpenMenu={setOpenMenu} action={action} itemToEdit={itemToEdit} />
      case 'Product':
        return <ProductsFormik setOpen={handleOpen} setOpenMenu={setOpenMenu} action={action} itemToEdit={itemToEdit} />
      case 'Sale':
        return <SalesFormik setOpen={handleOpen} setOpenMenu={setOpenMenu} action={action} itemToEdit={itemToEdit} />
      case 'Purchase':
        return <PurchasesFormik setOpen={handleOpen} setOpenMenu={setOpenMenu} action={action} itemToEdit={itemToEdit} />
      case 'Tax':
        return <TaxesFormik setOpen={handleOpen} setOpenMenu={setOpenMenu} action={action} itemToEdit={itemToEdit} />
      default:
        return null
    }
  }

  const buttonWithClick = cloneElement(button, { onClick: handleOpen })

  return (
    <>
      {buttonWithClick}
      <Dialog ref={ref} open={open} handler={handleOpen} size='xs' className='m-1 max-w-[fit-content] sm:max-w-[480px] md:max-w-[480px] lg:max-w-[480px] 2xl:max-w-[480px] 3xl:max-w-[480px] lg:w-full 2xl:w-full 3xl:w-full w-full overflow-hidden'>
        <DialogBody className='flex flex-col gap-3 p-4 sm:p-8 formModal max-h-[90vh] overflow-y-auto'>
          {action === 'create'
            ? (<h3 className='text-gray-900 font-bold text-2xl leading-none'>New {formType}</h3>)
            : (<h3 className='text-gray-900 font-bold text-2xl leading-none'>Modify {formType}</h3>)}
          {Formik()}
        </DialogBody>
      </Dialog>
    </>
  )
})

export default FormModal

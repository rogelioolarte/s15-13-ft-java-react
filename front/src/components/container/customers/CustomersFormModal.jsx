import {
  Dialog,
  DialogBody
} from '@material-tailwind/react'
import { cloneElement, forwardRef, useState } from 'react'
import { CustomersFormik } from '../../forms/CustomerFormikCreate'

const CustomersFormModal = forwardRef(({ button, action, customerToEdit, setOpenMenu }, ref) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const buttonWithClick = cloneElement(button, { onClick: handleOpen })

  return (
    <>
      {buttonWithClick}
      <Dialog ref={ref} open={open} handler={handleOpen} size='xs' className='m-1 max-h-[calc(100vh-0.5rem)] md:max-h-[initial] overflow-y-scroll md:overflow-y-auto'>
        <DialogBody className='flex flex-col gap-3 p-8'>
          {action === 'create'
            ? (<h3 className='text-gray-900 font-bold text-2xl leading-none'>New Customer</h3>)
            : (<h3 className='text-gray-900 font-bold text-2xl leading-none'>Modify Customer</h3>)}
          <CustomersFormik setOpen={setOpen} setOpenMenu={setOpenMenu} action={action} customerToEdit={customerToEdit} />
        </DialogBody>
      </Dialog>
    </>
  )
})

export default CustomersFormModal

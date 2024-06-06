import { forwardRef, useState, cloneElement } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

const ModalViewItemCustomer = forwardRef(({ button, customerToEdit, setOpenMenu }, ref) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => {
    setOpenModal(!openModal)
  }
  const buttonWithClick = cloneElement(button, { onClick: handleOpen })

  return (
    <>
      {buttonWithClick}
      <Dialog ref={ref} open={openModal} size='xs' handler={handleOpen} className='flex flex-col justify-center gap-4 p-5'>
        <DialogHeader className='justify-center p-0'>
          <h3 className='uppercase text-gray-900 font-bold'>Customer</h3>
        </DialogHeader>
        <DialogBody className='text-gray-900 text-center p-0'>
          <p>Customer Name: {customerToEdit.name}</p>
          <p>Personal Code N°: {customerToEdit.personalCode}</p>
          <p>Customer Type: {customerToEdit.customerType}</p>
          {/* <p>Active: {customerToEdit.active ? 'Enabled' : 'Disabled'}</p> */}
        </DialogBody>
        <DialogFooter className='p-0'>
          <Button
            onClick={() => {
              handleOpen()
              setOpenMenu(false)
            }}
            className='bg-[#212529]'
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
})
export default ModalViewItemCustomer

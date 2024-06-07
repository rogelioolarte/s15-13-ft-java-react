import { forwardRef, useState, cloneElement } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

const ModalViewItemProduct = forwardRef(({ button, productToEdit, setOpenMenu }, ref) => {
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
          <h3 className='uppercase text-gray-900 font-bold'>Product</h3>
        </DialogHeader>
        <DialogBody className='text-gray-900 text-center p-0'>
          <p>Customer Name: {productToEdit.name}</p>
          <p>Bar Code: {productToEdit.barcode}</p>
          <p>Description: {productToEdit.description}</p>
          <p>Sell Price: {productToEdit.salePrice}</p>
          <p>Minimal Stock to Set an Alert: {productToEdit.minimal}</p>
          <p>Actual Stock: {productToEdit.stock}</p>
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
export default ModalViewItemProduct

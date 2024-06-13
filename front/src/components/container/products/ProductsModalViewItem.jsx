import { forwardRef, useState, cloneElement } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Card, CardBody } from '@material-tailwind/react'

const ProductsModalViewItem = forwardRef(({ button, itemToEdit, setOpenMenu }, ref) => {
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
        <DialogBody className='text-gray-900 text-center p-0 items-center '>
          <Card className='' shadow={false}>
            <CardBody>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Product Name:
                </Typography>
                <Typography variant='h6' color='blue-gray' className=''>
                  {itemToEdit.name}
                </Typography>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Bar Code:
                </Typography>
                <Typography variant='h6' color='blue-gray' className=''>
                  {itemToEdit.barcode}
                </Typography>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Description:
                </Typography>
                <Typography variant='h6' color='blue-gray' className=''>
                  {itemToEdit.description}
                </Typography>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Sell Price:
                </Typography>
                <Typography variant='h6' color='blue-gray' className=''>
                  ${itemToEdit.salePrice}
                </Typography>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Minimal Stock:
                </Typography>
                <Typography variant='h6' color='blue-gray' className=''>
                  {itemToEdit.minimal}
                </Typography>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Actual Stock:
                </Typography>
                <Typography variant='h6' color='blue-gray' className=''>
                  {itemToEdit.stock}
                </Typography>
              </div>
            </CardBody>
          </Card>
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
export default ProductsModalViewItem

import { forwardRef, useState, cloneElement } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Card, CardBody } from '@material-tailwind/react'

const PurchasesModalViewItem = forwardRef(({ button, itemToEdit, setOpenMenu }, ref) => {
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
          <h3 className='uppercase text-gray-900 font-bold'>Purchase</h3>
        </DialogHeader>
        <DialogBody className='text-gray-900 text-center p-0 items-center '>
          <Card className='' shadow={false}>
            <CardBody>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Bill Code N°:
                </Typography>
                <Typography variant='paragraph' color='blue-gray' className=''>
                  {itemToEdit.bill}
                </Typography>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Supplier:
                </Typography>
                <Typography variant='paragraph' color='blue-gray' className=''>
                  {itemToEdit.supplier.name} - {itemToEdit.supplier.companyCode}
                </Typography>
              </div>
              <div className='divide-y divide-gray-200 mb-4'>
                {itemToEdit.productList.map((product, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between pb-3 pt-3 last:pb-0'
                  >
                    <div className='flex items-center gap-x-3'>
                      <div>
                        <Typography color='blue-gray' variant='paragraph'>
                          {index + 1}. {product.name}
                        </Typography>
                        <Typography variant='paragraph' color='gray'>
                          ${product.salePrice.toFixed(2)} x {product.quantity}
                        </Typography>
                      </div>
                    </div>
                    <Typography color='blue-gray' variant='h6'>
                      ${(product.salePrice * product.quantity).toFixed(2)}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Total:
                </Typography>
                <Typography variant='h6' color='blue-gray' className=''>
                  ${itemToEdit.productList.reduce((acc, product) => acc + (product.salePrice * product.quantity), 0).toFixed(2)}
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
export default PurchasesModalViewItem

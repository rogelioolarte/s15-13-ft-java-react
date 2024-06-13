import { forwardRef, useState, cloneElement } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Card, CardBody, Typography } from '@material-tailwind/react'
import { useCustomersActions } from '../../../hooks/useCustomersActions'

const SalesModalViewItem = forwardRef(({ button, itemToEdit, setOpenMenu }, ref) => {
  const { customers } = useCustomersActions()
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
          <h3 className='uppercase text-gray-900 font-bold'>Sale</h3>
        </DialogHeader>
        <DialogBody className='text-gray-900 text-center p-0 items-center '>
          <Card className='' shadow={false}>
            <CardBody>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Customer:
                </Typography>
                <Typography variant='paragraph' color='blue-gray' className=''>
                  {itemToEdit.customer.name} - {itemToEdit.customer.personalCode ? itemToEdit.customer.personalCode : customers.find(c => c.name === itemToEdit.customer.name).personalCode}
                </Typography>
              </div>
              <div className='divide-y divide-gray-200'>
                {itemToEdit.products.map((product, index) => (
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
                          ${product.salePrice.toFixed(2)} x {product.quantity}{/*  - ${product.discount} */}
                        </Typography>
                      </div>
                    </div>
                    <Typography color='blue-gray' variant='h6'>{/* ${(product.salePrice * product.quantity - p.discount).toFixed(2)} */}
                      ${(product.salePrice * product.quantity).toFixed(2)}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className='mb-4 mt-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Taxes:
                </Typography>
                <Typography variant='paragraph' color='blue-gray' className=''>
                  {itemToEdit.tax.percentage}%
                </Typography>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <Typography variant='h5' color='blue-gray' className=''>
                  Total:
                </Typography>
                <Typography variant='paragraph' color='blue-gray' className=''>
                  ${Math.abs(itemToEdit.products.reduce((acc, product) => acc + (product.salePrice * product.quantity), 0) * (1 + (itemToEdit.tax.percentage / 100))).toFixed(2)}
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
export default SalesModalViewItem

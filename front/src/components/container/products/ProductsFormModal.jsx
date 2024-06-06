import { forwardRef, cloneElement, useState } from 'react'
import { Dialog, DialogBody } from '@material-tailwind/react'
import { ProductsFormik } from '../../forms/ProductsFormik'

const ProductsFormModal = forwardRef(({ button, action, productToEdit, setOpenMenu }, ref) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const buttonWithClick = cloneElement(button, { onClick: handleOpen })

  return (
    <>
      {buttonWithClick}
      <Dialog ref={ref} open={open} handler={handleOpen} size='xs' className='m-1 max-h-[calc(100vh-0.5rem)] md:max-h-[initial] overflow-y-scroll md:overflow-y-auto'>
        <DialogBody className='flex flex-col gap-3 p-8'>
          {action === 'create'
            ? (<h3 className='text-gray-900 font-bold text-2xl leading-none'>New Product</h3>)
            : (<h3 className='text-gray-900 font-bold text-2xl leading-none'>Modify Product</h3>)}
          <ProductsFormik setOpen={handleOpen} setOpenMenu={setOpenMenu} action={action} productToEdit={productToEdit} />
        </DialogBody>
      </Dialog>
    </>
  )
})

export default ProductsFormModal

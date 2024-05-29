import {
  Dialog,
  DialogBody
} from '@material-tailwind/react'
import { cloneElement, useState } from 'react'
import { ProductsFormik } from '../pure/forms/ProductsFormik.jsx'

export function ProductsFormModal ({ button, action, productToEdit }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const buttonWithClick = cloneElement(button, { onClick: handleOpen })

  return (
    <>
      {buttonWithClick}
      <Dialog open={open} handler={handleOpen} size='sm'>
        <DialogBody className='p-0'>
          <ProductsFormik setOpen={setOpen} action={action} productToEdit={productToEdit} />
        </DialogBody>
      </Dialog>
    </>
  )
}

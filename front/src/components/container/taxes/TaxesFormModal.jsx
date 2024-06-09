import {
  Dialog,
  DialogBody
} from '@material-tailwind/react'
import { cloneElement, useState } from 'react'
import { TaxesFormik } from '../../forms/TaxesFormik'

export function TaxesFormModal ({ button, action, taxeToEdit }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const buttonWithClick = cloneElement(button, { onClick: handleOpen })

  return (
    <>
      {buttonWithClick}
      <Dialog open={open} handler={handleOpen} size='xs' className='m-1 max-h-[calc(100vh-0.5rem)] md:max-h-[initial] overflow-y-scroll md:overflow-y-auto'>
        <DialogBody className='flex flex-col gap-3 p-8'>
          {action === 'create'
            ? (<h3 className='text-gray-900 font-bold text-2xl leading-none'>New Taxe</h3>)
            : (<h3 className='text-gray-900 font-bold text-2xl leading-none'>Modify Taxe</h3>)}
          <TaxesFormik setOpen={setOpen} action={action} taxeToEdit={taxeToEdit} />
        </DialogBody>
      </Dialog>
    </>
  )
}

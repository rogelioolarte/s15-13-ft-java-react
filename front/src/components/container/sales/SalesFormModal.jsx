import {
  Dialog,
  DialogBody
} from '@material-tailwind/react'
import { cloneElement, useState } from 'react'
import SalesFormik from '../../forms/SalesFormik'

export function SalesFormModal ({ button, action, salesToEdit }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const buttonWithClick = cloneElement(button, { onClick: handleOpen })

  return (
    <>
      {buttonWithClick}
      <Dialog open={open} handler={handleOpen} size='xs' className='m-1 max-h-[calc(100vh-0.5rem)] md:max-h-[initial] overflow-y-scroll md:overflow-y-auto'>
        <DialogBody className='flex flex-col gap-3 p-8'>
          {action === 'create'
            ? (<h3 className='text-gray-900 font-bold text-2xl leading-none'>New Bill</h3>)
            : (<h3 className='text-gray-900 font-bold text-2xl leading-none'>Modify Sales</h3>)}
          <SalesFormik setOpen={setOpen} action={action} salesToEdit={salesToEdit} />
        </DialogBody>
      </Dialog>
    </>
  )
}

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

export default function ModalConfirmationDelete ({ handleOpen, open, message, callback }) {
  return (
    <Dialog open={open} size='xs' handler={handleOpen} className='flex flex-col justify-center gap-4 p-5'>
      <DialogHeader className='justify-center p-0'>
        <h3 className='uppercase text-gray-900 font-bold'>Confirmation</h3>
      </DialogHeader>
      <DialogBody className='text-gray-900 text-center p-0'>
        <p>{message ?? 'You are about to delete a supplier'}</p>
        <p>Are you sure you want to continue?</p>
      </DialogBody>
      <DialogFooter className='justify-center gap-2 p-0'>
        <Button onClick={handleOpen} color='gray'>
          <span>Cancel</span>
        </Button>
        <Button onClick={callback} className='bg-[#85A7BF] text-black'>
          <span>Delete</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

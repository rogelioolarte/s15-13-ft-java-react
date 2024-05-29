import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react'

export default function ModalConfirmationDelete ({ handleOpen, open }) {
  return (
    <Dialog open={open} size='xs' handler={handleOpen} className='flex flex-col justify-center gap-4 p-5'>
      <DialogHeader className='justify-center p-0'><h3 className='text-gray-900 font-bold'>CONFIRMATION</h3></DialogHeader>
      <DialogBody className='text-gray-900 text-center p-0'>
        <p>You are about to delete a supplier</p>
        <p>Are you sure you want to continue?</p>
      </DialogBody>
      <DialogFooter className='flex gap-2 w-full justify-center p-0'>
        <Button
          onClick={handleOpen}
          className='bg-[#85A7BF] text-gray-900'
        >
          <span>Delete</span>
        </Button>
        <Button variant='gradient' onClick={handleOpen} className='bg-[#212529]'>
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

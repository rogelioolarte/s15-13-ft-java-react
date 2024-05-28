import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from 'react'
import { ProductsFormik } from '../pure/forms/ProductsFormik.jsx'

export function ProductsFormModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen}  className='bg-secondary-40 py-4 text-black'>Add New</Button>
      <Dialog open={open} handler={handleOpen} size={'xs'}>
        <DialogBody className={'p-0'}>
          <ProductsFormik setOpen={setOpen}/>
        </DialogBody>
      </Dialog>
    </>
  );
}
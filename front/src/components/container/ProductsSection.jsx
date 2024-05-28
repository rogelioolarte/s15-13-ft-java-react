import { Button, Typography } from '@material-tailwind/react'
import { ProductsTable } from './ProductsTable.jsx'
import { ProductsFormModal } from './ProductsFormModal.jsx'

export function ProductsSection () {
  return (
    <>
      <main className='text-center p-12 md:p-12 w-full flex flex-col items-center'>
        <Typography className='font-bold' variant='h1'>Products</Typography>
        <div className='gap-10 flex my-12'>
          <ProductsFormModal />
          <Button className='bg-warning-40 py-4 text-black'>Eliminar</Button>
        </div>
        <ProductsTable />
      </main>
    </>
  )
}
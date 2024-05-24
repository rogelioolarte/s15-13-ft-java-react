import { Button, Typography } from '@material-tailwind/react'

import { SalesTable } from './SalesTable'
export default function SalesSection () {
  return (
    <>
      <main className='text-center p-12 md:p-12 w-full flex flex-col items-center '>
        <Typography className='font-bold' variant='h1'>Productos Vendidos</Typography>
        <div className='gap-10 flex my-12'>
          <Button className='bg-secondary-40 py-4 text-black'>Agregar Nuevo</Button>
          <Button className='bg-warning-40 py-4 text-black'>Eliminar</Button>
        </div>
        <SalesTable />
      </main>
    </>
  )
}

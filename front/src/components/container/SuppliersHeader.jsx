import { FaMagnifyingGlass } from 'react-icons/fa6'
import {
  Button,
  Input,
  Typography
} from '@material-tailwind/react'

export default function SuppliersHeader () {
  return (
    <>
      <div className='w-full text-center'>
        <Typography variant='h2' color='black'>
          Suppliers
        </Typography>
      </div>
      <div className='w-full flex flex-col lg:flex-row items-center lg:justify-between gap-2'>
        <div className='w-full md:w-72'>
          <Input
            className='bg-white'
            label='Search'
            icon={<FaMagnifyingGlass className='h-5 w-5' />}
          />
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <Button className='min-w-fit flex-1 bg-[#D1D4FA] text-gray-900 shadow-none hover:shadow-none hover:bg-indigo-100 transition-all duration-300 ease-in-out'>NEW SUPPLIER</Button>
          <Button className='min-w-fit flex-1 bg-[#D1D4FA] text-gray-900 shadow-none hover:shadow-none hover:bg-indigo-100 transition-all duration-300 ease-in-out'>DELETE SUPPLIERS</Button>
        </div>
      </div>
    </>
  )
}

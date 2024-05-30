import { Button, Input, Typography } from '@material-tailwind/react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ProductsFormModal } from './ProductsFormModal.jsx'

export default function ProductsHeader ({ productToEdit, selectedItems, setIsDeleteConfirmationOpen }) {
  return (
    <>
      <div className='w-full text-center'>
        <Typography variant='h2' color='black'>
          Products
        </Typography>
      </div>
      <div className='w-full flex flex-col lg:flex-row items-center lg:justify-between gap-2'>
        {/* Search */}
        <div className='w-full md:w-72'>
          <Input
            className='bg-white'
            label='Search'
            icon={<FaMagnifyingGlass className='h-5 w-5' />}
          />
        </div>
        {/* Buttons */}
        <div className='flex flex-wrap items-center gap-2'>
          <ProductsFormModal button={<Button className='min-w-fit flex-1 bg-secondary-40 text-gray-900 shadow-none hover:shadow-none hover:bg-secondary-60 transition-all duration-300 ease-in-out'>Add New</Button>} action='create' />
          <ProductsFormModal button={<Button disabled={selectedItems.length !== 1} className='min-w-fit flex-1 bg-secondary-40 text-gray-900 shadow-none hover:shadow-none hover:bg-secondary-60 transition-all duration-300 ease-in-out'>Modify</Button>} action='edit' productToEdit={productToEdit} />
          <Button disabled={selectedItems.length < 1} onClick={() => setIsDeleteConfirmationOpen(true)} className='min-w-fit flex-1 bg-warning-40 text-gray-900 shadow-none hover:shadow-none hover:bg-warning-60 transition-all duration-300 ease-in-out'>Delete</Button>
        </div>
      </div>
    </>
  )
}

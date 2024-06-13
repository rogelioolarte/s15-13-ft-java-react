import { Button, Typography } from '@material-tailwind/react'
import FormModal from '../../pure/FormModal'
import SearchTables from '../../pure/SearchTables'

export default function SuppliersHeader ({ onSearch, selectedItems, setIsDeleteConfirmationOpen }) {
  return (
    <>
      <div className='w-full text-center'>
        <Typography variant='h2' color='black'>
          Suppliers
        </Typography>
      </div>
      <div className='w-full flex flex-col lg:flex-row items-center lg:justify-between gap-2'>
        {/* Search */}
        <div className='w-full md:w-72'>
          <SearchTables onSearch={onSearch} />
        </div>
        {/* Buttons */}
        <div className='flex flex-wrap items-center gap-2'>
          <FormModal button={<Button className='min-w-fit flex-1 bg-warning text-gray-900 shadow-none hover:shadow-none hover:bg-warning-80 transition-all duration-300 ease-in-out'>Add New</Button>} action='create' formType='Supplier' />
          <Button disabled={selectedItems.length < 1} onClick={() => setIsDeleteConfirmationOpen(true)} className='min-w-fit flex-1 bg-warning-80 text-gray-900 shadow-none hover:shadow-none hover:bg-warning-60 transition-all duration-300 ease-in-out'>Delete</Button>
        </div>
      </div>
    </>
  )
}

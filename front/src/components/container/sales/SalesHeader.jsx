import { Button, Typography } from '@material-tailwind/react'
import { SalesFormModal } from './SalesFormModal'
import SearchTables from '../../pure/SearchTables'

export default function SalesHeader ({ onSearch }) {
  return (
    <>
      <div className='w-full text-center'>
        <Typography variant='h2' color='black'>
          Sales
        </Typography>
      </div>
      <div className='w-full flex flex-col lg:flex-row items-center lg:justify-between gap-2'>
        {/* Search */}
        <div className='w-full md:w-72'>
          <SearchTables onSearch={onSearch} />
        </div>
        {/* Buttons */}
        <div className='flex flex-wrap items-center gap-2'>
          <SalesFormModal button={<Button className='min-w-fit flex-1 bg-secondary-40 text-gray-900 shadow-none hover:shadow-none hover:bg-secondary-60 transition-all duration-300 ease-in-out'>New Bill</Button>} action='create' />
        </div>
      </div>
    </>
  )
}

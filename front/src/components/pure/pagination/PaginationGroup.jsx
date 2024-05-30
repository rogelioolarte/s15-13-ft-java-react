import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { IconButton, ButtonGroup, Typography } from '@material-tailwind/react'

export default function PaginationGroup ({ page, setPage, totalItems }) {
  const itemsPerPage = 7
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getItemProps = (index) => ({
    className: page === index ? 'bg-white text-black font-bold hover:opacity-100 hover:bg-[#F8F9FC] focus:ring-0' : '',
    onClick: () => setPage(index)
  })

  const next = () => {
    if (page === totalPages) return
    setPage(page + 1)
  }

  const prev = () => {
    if (page === 1) return
    setPage(page - 1)
  }

  return (
    <>
      <Typography variant='small' color='blue-gray' className='font-normal hidden sm:block'>
        Page {page} of {totalPages}
      </Typography>
      <ButtonGroup variant='outlined' className='hidden sm:block bg-[#eaedf7] rounded-lg'>
        <IconButton className='bg-transparent text-gray-900 hover:opacity-100 hover:bg-[#F8F9FC] focus:ring-0' onClick={prev}>
          <FaArrowLeftLong strokeWidth={2} className='h-4 w-4' />
        </IconButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton className='bg-transparent text-gray-900 hover:opacity-100 hover:bg-[#F8F9FC] focus:ring-0' key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
        <IconButton className='bg-transparent text-gray-900 hover:opacity-100 hover:bg-[#F8F9FC] focus:ring-0' onClick={next}>
          <FaArrowRightLong strokeWidth={2} className='h-4 w-4' />
        </IconButton>
      </ButtonGroup>
    </>
  )
}

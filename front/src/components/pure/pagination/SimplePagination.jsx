import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import {
  Typography,
  IconButton
} from '@material-tailwind/react'

export default function SimplePagination ({ page, setPage, totalPages }) {
  const next = () => {
    if (page === totalPages) return
    setPage(page + 1)
  }

  const prev = () => {
    if (page === 1) return
    setPage(page - 1)
  }

  return (
    <div className='sm:hidden flex items-center gap-8'>
      <IconButton
        size='sm'
        variant='outlined'
        onClick={prev}
        disabled={page === 1}
      >
        <FaArrowLeftLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
      <Typography color='gray' className='font-normal'>
        Page {page} of {totalPages}
      </Typography>
      <IconButton
        size='sm'
        variant='outlined'
        onClick={next}
        disabled={page === 10}
      >
        <FaArrowRightLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
    </div>
  )
}

import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { IconButton, ButtonGroup, Typography } from '@material-tailwind/react'

export default function PaginationGroup ({ active, setActive }) {
  const getItemProps = (index) => ({
    className: active === index ? 'bg-gray-100 text-gray-900' : '',
    onClick: () => setActive(index)
  })

  const next = () => {
    if (active === 5) return

    setActive(active + 1)
  }

  const prev = () => {
    if (active === 1) return

    setActive(active - 1)
  }

  return (
    <>
      <Typography variant='small' color='blue-gray' className='font-normal hidden sm:block'>
        Page 1 of 10
      </Typography>
      <ButtonGroup variant='outlined' className='hidden sm:block'>
        <IconButton onClick={prev}>
          <FaArrowLeftLong strokeWidth={2} className='h-4 w-4' />
        </IconButton>
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
        <IconButton {...getItemProps(5)}>5</IconButton>
        <IconButton onClick={next}>
          <FaArrowRightLong strokeWidth={2} className='h-4 w-4' />
        </IconButton>
      </ButtonGroup>
    </>
  )
}

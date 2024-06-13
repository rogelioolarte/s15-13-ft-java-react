import { Typography } from '@material-tailwind/react'
import { BsCalendar3 } from 'react-icons/bs'

export default function ActualDate () {
  return (
    <div className='flex items-center'>
      <BsCalendar3 className='mx-2' />
      <Typography variant='lead'>{new Date().toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: '2-digit' })}</Typography>
    </div>
  )
}

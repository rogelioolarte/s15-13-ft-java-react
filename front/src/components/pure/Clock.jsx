import { Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { BsClock } from 'react-icons/bs'

export default function Clock () {
  const [date, setDate] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const tick = () => {
      setDate(new Date().toLocaleTimeString())
    }
    const intervalId = setInterval(tick, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='flex items-center'>
      <BsClock className='mx-2' />
      <Typography variant='lead'>{date}</Typography>
    </div>
  )
}

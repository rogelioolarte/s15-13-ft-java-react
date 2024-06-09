import { TfiMenu } from 'react-icons/tfi'
import { MdOutlineClose } from 'react-icons/md'
import {
  IconButton
} from '@material-tailwind/react'

export default function Navbar ({ isDrawerOpen, setIsDrawerOpen }) {
  const openDrawer = () => setIsDrawerOpen(true)

  return (
    <nav className='flex justify-center px-2 w-14 min-h-screen bg-[#D9D9D9]'>
      <IconButton variant='text' size='md' onClick={openDrawer} className='menu top-2 z-10'>
        {isDrawerOpen
          ? (
            <MdOutlineClose className='h-6 w-6' />
            )
          : (
            <TfiMenu className='h-6 w-6' />
            )}
      </IconButton>
    </nav>
  )
}

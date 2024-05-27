import {
  Navbar,
  Typography,
  Button
} from '@material-tailwind/react'
import LogoMedium from '../../assets/logo-md.svg'
import { Link } from 'react-router-dom'

export default function NavBarHome () {
  return (
    <Navbar className='pt-5 bg-black text-white h-max max-w-full rounded-none px-4 py-2 lg:px-5 lg:py-2'>
      <div className='flex items-center justify-between flex-row'>
        <Typography
          as='a'
          className='mr-4 cursor-pointer'
        >
          <img src={LogoMedium} alt='logo-md' className='w-[3rem]' />
        </Typography>
        <div className='flex items-center gap-4'>
          <div className='flex items-center'>
            <Link to='/login'>
              <Button
                variant='filled'
                size='sm'
                className='bg-white text-black'
              >
                <span>Sign in</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Navbar>
  )
}

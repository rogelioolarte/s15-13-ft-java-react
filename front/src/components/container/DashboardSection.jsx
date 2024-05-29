import ActualDate from '../pure/ActualDate'
import SearchBar from '../pure/forms/SearchBar'
import ShowUserData from '../pure/ShowUserData'
import {
  Navbar,
  Typography
} from '@material-tailwind/react'

export default function DashboardSection () {
  return (
    <div className='flex flex-col items-center justify-items-center w-full gap-4 md:gap-8 p-3'>
      <Navbar className='w-full max-w-screen-xl px-4 py-2 lg:px-8 text-[#212121] flex flex-col justify-center md:items-center md:justify-between md:flex-row gap-2'>
        <Typography as='a' className='flex font-bold'>
          <ActualDate />
        </Typography>
        <SearchBar />
      </Navbar>
      <ShowUserData />
      <div className='w-full h-full flex flex-col gap-4 justify-start md:justify-center items-center md:flex-row'>
        <div className='w-full max-w-[450px] md:h-full md:max-h-[380px] flex flex-col items-center gap-1'>
          <Typography variant='h4' className='text-center text-base md:text-lg'>SHORTCUTS</Typography>
          <div className='w-full flex flex-col items-center border border-black'>
            Area de graficas u otros
          </div>
        </div>
        <div className='w-full max-w-[450px] md:h-full md:max-h-[380px] flex flex-col items-center gap-1'>
          <Typography variant='h4' className='text-center text-base md:text-lg'>SALES SUMMARY</Typography>
          <div className='w-full flex flex-col items-center border border-black'>
            Area de graficas u otros
          </div>
        </div>
      </div>
    </div>
  )
}

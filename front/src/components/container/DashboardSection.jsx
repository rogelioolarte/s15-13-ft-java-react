import ActualDate from '../pure/ActualDate'
import SearchBar from '../pure/forms/SearchBar'
import Shortcuts from '../pure/Shortcuts'
import ShowUserData from '../pure/ShowUserData'
import {
  Navbar,
  Typography
} from '@material-tailwind/react'

export default function DashboardSection() {
  return (
    <div className='flex flex-col items-center justify-items-center w-full gap-4 md:gap-8 p-3'>
      <Navbar className='w-full max-w-screen-xl px-4 py-2 lg:px-8 text-[#212121] flex flex-col justify-center md:items-center md:justify-between md:flex-row gap-2'>
        <Typography as='a' className='flex font-bold'>
          <ActualDate />
        </Typography>
        <SearchBar />
      </Navbar>
      <ShowUserData />
      <Shortcuts />
    </div>
  )
}

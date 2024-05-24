import ActualDate from '../pure/ActualDate'
import SearchBar from '../pure/SearchBar'
import ShowUserData from '../pure/ShowUserData'
import {
  Navbar,
  Typography
} from '@material-tailwind/react'

export default function HomeSection () {
  return (
    <div className='flex flex-col items-center justify-items-center w-[100%] h-[90%] '>
      <Navbar className='mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-2 my-3 '>
        <div className='container mx-auto flex flex-wrap items-center justify-between
          text-blue-gray-900'
        >
          <Typography as='a' className='mr-4 cursor-pointer py-1.5 font-medium'>
            <ActualDate />
          </Typography>
          <SearchBar />
        </div>
      </Navbar>
      <ShowUserData />
      <div className='h-[90%] w-[80%] mt-[5%] border border-black border-solid'>
        Area de graficas u otros
      </div>
    </div>
  )
}

import ActualDate from '../pure/ActualDate'
import SearchBar from '../pure/SearchBar'
import ShowUserData from '../pure/ShowUserData'
import LogoMedium from '../../assets/logo-md.svg'

export default function HomeSection () {
  return (
    <div className='flex flex-col items-center justify-items-center w-[90%] h-[90%] '>
      <div className='flex flex-col md:flex-row items-center justify-between w-[80%]
        rounded-[0.5rem] border-[0.1rem] border-black mt-[2%] px-[2%] md:h-[20%] mb-[3%]'
      >
        <ActualDate /><SearchBar />
      </div>
      <div className='h-[60%] w-[55%] bg-white border border-[#D6D6D6] rounded-[0.5rem]
        grid grid-flow-row auto-rows-max md:grid-flow-col md:auto-cols-max
        justify-center md:justify-start content-center items-center justify-items-center md:content-around'
      >
        <img src={LogoMedium} alt='user' className='bg-black w-[15vh] rounded-[5rem] md:ml-[40%] ' />
        <ShowUserData />
      </div>
      <div className='h-[90%] w-[80%] mt-[5%] border border-black border-solid'>
        Area de graficas u otros
      </div>
    </div>
  )
}

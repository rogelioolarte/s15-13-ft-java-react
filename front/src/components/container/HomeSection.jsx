import { Button } from '@material-tailwind/react'
import Background from '../../assets/background.svg'
import PhoneMedium from '../../assets/phone.svg'

export default function HomeSection () {
  return (
    <div
      className='md:h-[80%] w-full flex flex-col md:flex-row items-center justify-center content-center'
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='w-[95vh]'>
        <h1 className='text-[8vh] font-black w-[60%]'>The easiest way to organize your inventory</h1>
        <p className='text-[2.6vh]'>OPTIMIZE YOUR PRODUCT MANAGEMENT AND INVENTORY CONTROL</p>
        <Button className='mt-6 bg-[#8D8543] text-black text-[2vh] w-[40vh]'>CONTACT A REPRESENTATIVE</Button>
      </div>
      <img src={PhoneMedium} alt='phone-md' className='md:h-[70vh]' />
    </div>
  )
}

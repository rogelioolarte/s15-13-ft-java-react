import { Button } from '@material-tailwind/react'
import Background from '../../assets/background.svg'
import PhoneMedium from '../../assets/phone.svg'

export default function HomeSection () {
  return (
    <div
      className='md:h-[80%] md:w-full px-5 flex flex-col md:flex-row items-center justify-center content-center'
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='md:w-[95vh]'>
        <h1 className='mt-6 md:mt-0 text-4xl md:text-5xl font-black w-[60%]'>The easiest way to organize your inventory</h1>
        <p className='md:text-[2.6vh]'>OPTIMIZE YOUR PRODUCT MANAGEMENT AND INVENTORY CONTROL</p>
        <Button className='mb-7 md:mb-0 mt-6 bg-[#8D8543] text-black'>CONTACT A REPRESENTATIVE</Button>
      </div>
      <img src={PhoneMedium} alt='phone-md' className='md:h-[70vh]' />
    </div>
  )
}

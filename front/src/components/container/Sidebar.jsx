import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo-md.svg'
import { AiOutlineDashboard, AiOutlineSetting } from 'react-icons/ai'
import { BsReceipt, BsCartCheck, BsTruck, BsCalendarDate, BsBoxArrowRight } from 'react-icons/bs'

import { TbPresentationAnalytics } from 'react-icons/tb'

export default function Sidebar ({ openSidebar, setOpenSidebar }) {
  const navigate = useNavigate()
  const propertiesProfile = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: <AiOutlineDashboard className='text-2xl' />
    },
    {
      name: 'Sales',
      url: '/sales',
      icon: <BsReceipt className='text-2xl' />
    },
    {
      name: 'Purchases',
      url: '/purchases',
      icon: <BsCartCheck className='text-2xl' />
    },
    {
      name: 'Suppliers',
      url: '/suppliers',
      icon: <BsTruck className='text-2xl' />
    },
    {
      name: 'Analíticas',
      url: '/analytics',
      icon: <TbPresentationAnalytics className='text-2xl' />
    },
    {
      name: 'Queries',
      url: '/queries',
      icon: <BsCalendarDate className='text-2xl' />
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: <AiOutlineSetting className='text-2xl' />
    }
  ]
  const navigateRoutes = (url) => {
    navigate(url)
    setOpenSidebar(false)
  }

  return (
    <div
      className={`${openSidebar ? 'w-0' : 'w-60 sm:w-80'} min-h-screen transition-all duration-500 ease-in-out`}
    >
      <div className='sidebar flex h-full min-h-svh gap-2 flex-col bg-black overflow-y-scroll'>
        <header className='px-6 pt-10 pb-5'>
          <img
            className='w-24 object-cover sm:w-32'
            src={Logo}
            alt=''
          />
        </header>
        <div className='flex h-2/3 w-full flex-col gap-1'>
          {propertiesProfile.map((properties) => (
            <button
              className='w-full text-white px-6 py-2 2xl:py-3 flex items-center gap-2'
              key={properties.name}
              onClick={() => navigateRoutes(properties.url)}
            >
              {properties.icon}
              {properties.name}
            </button>
          ))}
          <button
            className='w-full text-white px-6 py-2 flex items-center gap-2'
            onClick={() => {
              // resetAllSlices(),
              navigate('/home')
            }}
          >
            <BsBoxArrowRight className='text-2xl' />Log out
          </button>
        </div>
      </div>
    </div>
  )
};

import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo-md.svg'
import { AiOutlineDashboard, AiOutlineProduct, AiOutlineSetting } from 'react-icons/ai'
import { BsReceipt, BsCartCheck, BsTruck, BsCalendarDate, BsBoxArrowRight } from 'react-icons/bs'
import { TbPresentationAnalytics } from 'react-icons/tb'
import {
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card
} from '@material-tailwind/react'
import { useUserActions } from '../../hooks/useUserActions'

export default function Sidebar ({ isDrawerOpen, setIsDrawerOpen }) {
  const { useResetUser } = useUserActions()
  const navigate = useNavigate()
  const propertiesProfile = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: <AiOutlineDashboard className='h-5 w-5' />
    },
    {
      name: 'Products',
      url: '/products',
      icon: <AiOutlineProduct className='h-5 w-5' />
    },
    {
      name: 'Sales',
      url: '/sales',
      icon: <BsReceipt className='h-5 w-5' />
    },
    // {
    //   name: 'Purchases',
    //   url: '/purchases',
    //   icon: <BsCartCheck className='h-5 w-5' />
    // },
    {
      name: 'Suppliers',
      url: '/suppliers',
      icon: <BsTruck className='h-5 w-5' />
    },
    {
      name: 'Analytics',
      url: '/analytics',
      icon: <TbPresentationAnalytics className='h-5 w-5' />
    },
    {
      name: 'Inquiries',
      url: '/inquiries',
      icon: <BsCalendarDate className='h-5 w-5' />
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: <AiOutlineSetting className='h-5 w-5' />
    }
  ]
  const navigateRoutes = (url) => {
    navigate(url)
    setIsDrawerOpen(false)
  }

  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className='sidebar bg-black overflow-y-scroll ps-2 py-4'>
        <Card
          color='transparent'
          shadow={false}
          className='h-[calc(100vh-2rem)] w-full'
        >
          <header className='mb-5 flex justify-center'>
            <img
              className='w-24 object-cover sm:w-32'
              src={Logo}
              alt=''
            />
          </header>
          <List className='p-0'>
            {propertiesProfile.map((properties) => (
              <ListItem
                className='text-white hover:text-black'
                key={properties.name}
                onClick={() => navigateRoutes(properties.url)}
              >
                <ListItemPrefix>
                  {properties.icon}
                </ListItemPrefix>
                {properties.name}
              </ListItem>
            ))}
            <Link to='/login' onClick={() => useResetUser()}>
              <ListItem className='text-white hover:text-black'>
                <ListItemPrefix>
                  <BsBoxArrowRight className='h-5 w-5' />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </Link>
          </List>
        </Card>
      </Drawer>
    </>
  )
}

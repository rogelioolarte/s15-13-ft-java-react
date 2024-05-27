import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from '@material-tailwind/react'
import LogoMedium from '../../assets/logo-md.svg'
import { useUserActions } from '../../hooks/useUserActions'

export default function ShowUserData () {
  const { user } = useUserActions()

  return (
    <Card className='w-[45%] h-[20%] flex flex-row justify-items-center mt-3'>
      <CardHeader className='h-full rounded-full'> </CardHeader>
      <img src={LogoMedium} alt='profile-picture' className='bg-black size-30 rounded-full h-full' />
      <CardBody className='text-center justify-items-center content-center ml-5'>
        <Typography variant='h4' color='blue-gray' className='mb-2'>
          Welcome, {user.first_name} {user.last_name}
        </Typography>
      </CardBody>
    </Card>
  )
}

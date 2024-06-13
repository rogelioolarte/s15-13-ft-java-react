import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import UserRandom from '../../assets/user.png'
import { useUserActions } from '../../hooks/useUserActions'

export default function ShowUserData () {
  const { user } = useUserActions()

  return (
    <Card className='md:max-w-xl w-full p-4 md:py-5 flex items-center justify-center md:flex-row gap-2 md:gap-4'>
      <CardHeader floated={false} shadow={false}>
        <img src={UserRandom} alt='profile-picture' className=' h-[120px]' />
      </CardHeader>
      <CardBody className='text-center p-0 md:text-start'>
        <Typography color='blue-gray' variant='h3'>Welcome, {user.first_name} {user.last_name}</Typography>
      </CardBody>
    </Card>
  )
}

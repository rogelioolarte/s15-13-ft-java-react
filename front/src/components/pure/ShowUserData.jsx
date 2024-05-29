import {
  Card,
  CardBody,
  Typography
} from '@material-tailwind/react'
import { toast } from 'sonner'
import UserRandom from '../../assets/user_random.png'
import { useUserActions } from '../../hooks/useUserActions'

export default function ShowUserData() {
  const { user } = useUserActions()
  console.log(user)
  return (
    <Card className='max-w-xl w-full p-4 md:py-5 flex items-center justify-center md:flex-row gap-2 md:gap-4'>
      <img src={UserRandom} alt='profile-picture' className='rounded-full w-[100px] h-[100px]' />
      <CardBody className='text-center p-0 md:text-start'>
        <Typography variant='h4' color='blue-gray'>
          {/* Welcome, {user.first_name} {user.last_name} */}
          Welcome, Pepen Guayabas
        </Typography>
        <button onClick={() => toast.success('This is a sonner toast')}>Render my toast</button>
      </CardBody>
    </Card>
  )
}

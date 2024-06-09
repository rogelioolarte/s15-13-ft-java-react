import {
  Button,
  Card,
  Typography
} from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import Grafico from '../../assets/grafico-diagramas.png'

export default function Shortcuts () {
  return (
    <div className='w-full h-full flex flex-col gap-4 justify-start md:justify-center items-center md:flex-row'>
      <div className='w-full max-w-[450px] md:h-full md:max-h-[380px] flex flex-col items-center gap-1'>
        <Typography variant='h4' className='uppercase text-center text-base md:text-lg'>Shortcuts</Typography>
        <Card className='w-full flex flex-col items-center gap-5 px-6 md:px-12 py-4 md:pt-8'>
          <div className='w-full flex flex-col gap-5'>
            <Link to='/sales'><Button className='bg-[#2E90FA]' fullWidth size='lg'>Sales</Button></Link>
            <Link to='/purchases'><Button className='bg-[#2E90FA]' fullWidth size='lg'>Purchases</Button></Link>
          </div>
          <Button className='self-end' variant='text' size='sm'>Edit</Button>
        </Card>
      </div>
      <div className='w-full max-w-[450px] md:h-full md:max-h-[380px] flex flex-col items-center gap-1'>
        <Typography variant='h4' className='uppercase text-center text-base md:text-lg'>Analytics</Typography>
        <Card className='w-full flex flex-col items-center gap-1 px-6 md:px-12 py-4 md:pt-8 overflow-hidden'>
          <img className='object-cover h-[150px]' src={Grafico} alt='Estadisticas' />
          <Button className='self-end' variant='text' size='sm'>More</Button>
        </Card>
      </div>
    </div>
  )
}

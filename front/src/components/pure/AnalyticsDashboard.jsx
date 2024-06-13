import { Typography } from '@material-tailwind/react'
import SalesSummary from './SalesSummary'

export default function AnalyticsDashboard () {
  return (
    <div className='w-full h-full flex flex-col gap-4 justify-start md:justify-center items-center md:flex-row'>
      <div className='w-full md:max-w-[450px] md:h-full md:max-h-[380px] flex flex-col gap-1'>
        <Typography variant='h3' className='text-center text-base md:text-lg'>Purchases Summary</Typography>
        <SalesSummary />
      </div>
      <div className='w-full md:max-w-[450px] md:h-full md:max-h-[380px] flex flex-col gap-1'>
        <Typography variant='h3' className='text-center text-base md:text-lg'>Sales Summary</Typography>
        <SalesSummary />
      </div>
    </div>
  )
}

import {
  Button,
  Card,
  Typography
} from '@material-tailwind/react'

export default function Shortcuts () {
  return (
    <div className='w-full h-full flex flex-col gap-4 justify-start md:justify-center items-center md:flex-row'>
      <div className='w-full max-w-[450px] md:h-full md:max-h-[380px] flex flex-col items-center gap-1'>
        <Typography variant='h4' className='text-center text-base md:text-lg'>SHORTCUTS</Typography>
        <Card className='w-full flex flex-col items-center gap-5 px-12 pt-8 pb-4'>
          <div className='w-full flex flex-col gap-5'>
            <Button className='bg-[#2E90FA]' fullWidth size='lg'>INQUIRIES</Button>
            <Button className='bg-[#2E90FA]' fullWidth size='lg'>PURCHASES</Button>
          </div>
          <Button className='self-end' variant='text' size='sm'>Edit</Button>
        </Card>
      </div>
      <div className='w-full max-w-[450px] md:h-full md:max-h-[380px] flex flex-col items-center gap-1'>
        <Typography variant='h4' className='text-center text-base md:text-lg'>SALES SUMMARY</Typography>
        <Card className='w-full flex flex-col items-center'>
          Area de graficas u otros
        </Card>
      </div>
    </div>
  )
}

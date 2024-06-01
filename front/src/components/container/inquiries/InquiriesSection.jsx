import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react'
import SimplePagination from '../../pure/pagination/SimplePagination'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'

const TABLE_HEAD = ['Customer', 'Product', 'Code', 'Sale Date', 'Invoice No.', 'Invoice Date', 'Total Sold', 'TOTAL', '']

const TABLE_ROWS = [
  {
    name: 'John Michael',
    product: 'john@creative-tim.com',
    code: 'Manager',
    saleDate: '23/04/18',
    invoiceNo: 'XX',
    invoiceDate: '24/04/18',
    totalSold: '$2000',
    total: '$2000'
  },
  {
    name: 'Alexa Liras',
    product: 'alexa@creative-tim.com',
    code: 'Programator',
    saleDate: '23/04/18',
    invoiceNo: 'XX',
    invoiceDate: '24/04/18',
    totalSold: '$2000',
    total: '$2000'
  },
  {
    name: 'Laurent Perrier',
    product: 'laurent@creative-tim.com',
    code: 'Executive',
    saleDate: '23/04/18',
    invoiceNo: 'XX',
    invoiceDate: '24/04/18',
    totalSold: '$2000',
    total: '$2000'
  },
  {
    name: 'Michael Levi',
    product: 'michael@creative-tim.com',
    code: 'Programator',
    saleDate: '23/04/18',
    invoiceNo: 'XX',
    invoiceDate: '24/04/18',
    totalSold: '$2000',
    total: '$2000'
  },
  {
    name: 'Richard Gran',
    product: 'richard@creative-tim.com',
    code: 'Manager',
    saleDate: '23/04/18',
    invoiceNo: 'XX',
    invoiceDate: '24/04/18',
    totalSold: '$2000',
    total: '$2000'
  }
]

function MenuCustomAnimation({ handleOpen }) {
  return (
    <Menu
      placement='left'
      animate={{
        mount: { x: 0 },
        unmount: { x: 25 }
      }}
    >
      <MenuHandler>
        <IconButton className='rounded bg-transparent shadow-none text-gray-900 text-lg hover:shadow-none hover:text-gray-800 transition-colors duration-300 ease-in-out'>
          <HiOutlineDotsVertical />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={() => handleOpen('sm')}>Delete</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Order from supplier</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default function InquiriesSection() {
  const [active, setActive] = useState(1)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <main className='w-full flex justify-center overflow-hidden p-8'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-8 m-0 mb-4'>
          <div className='w-full text-center'>
            <Typography variant='h1' color='black'>
              Inquiries
            </Typography>
          </div>
          <div className='w-full md:w-72'>
            <Input
              className='bg-white'
              label='Search'
              icon={<FaMagnifyingGlass className='h-5 w-5' />}
            />
          </div>
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className='cursor-pointer bg-[#F1F3F9] p-4 transition-colors hover:bg-[#e4e7ee]'
                  >
                    <Typography
                      variant='small'
                      className='flex text-[#1D2433] font-semibold items-center justify-between gap-2 leading-none'
                    >
                      {head}{' '}
                      {index !== TABLE_HEAD.length - 1 && (
                        <LuChevronsUpDown strokeWidth={2} className='h-4 w-4' />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ name, product, code, saleDate, invoiceNo, invoiceDate, totalSold, total }, index) => {
                  const classes = 'p-4 text-[#1D2433]'
                  return (
                    <tr key={index} className='even:bg-[#F8F9FC] odd:bg-white'>
                      {/* name */}
                      <td className={classes}>
                        <div className='flex items-center gap-3'>
                          <div className='flex flex-col'>
                            <Typography
                              variant='small'
                              className='font-normal'
                            >
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      {/* product */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {product}
                        </Typography>
                      </td>
                      {/* code */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {code}
                        </Typography>
                      </td>
                      {/* saleDate */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {saleDate}
                        </Typography>
                      </td>
                      {/* invoiceNo */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {invoiceNo}
                        </Typography>
                      </td>
                      {/* invoiceDate */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {invoiceDate}
                        </Typography>
                      </td>
                      {/* totalSold */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {totalSold}
                        </Typography>
                      </td>
                      {/* total */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {total}
                        </Typography>
                      </td>
                      {/* edit */}
                      <td className={classes}>
                        <MenuCustomAnimation handleOpen={handleOpen} />
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between p-4'>
          <PaginationGroup active={active} setActive={setActive} />
          <SimplePagination active={active} setActive={setActive} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete handleOpen={handleOpen} open={open} />
    </main>
  )
}

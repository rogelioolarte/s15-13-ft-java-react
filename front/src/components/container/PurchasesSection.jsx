import { useState } from 'react'
import { FaMagnifyingGlass, FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  ButtonGroup,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react'

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

function MenuCustomAnimation () {
  return (
    <Menu
      placement='left'
      animate={{
        mount: { x: 0 },
        unmount: { x: 25 }
      }}
    >
      <MenuHandler>
        <IconButton className='rounded bg-transparent shadow-none text-black text-lg hover:shadow-none hover:text-gray-800 transition-colors duration-300 ease-in-out'>
          <HiOutlineDotsVertical />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Order from supplier</MenuItem>
      </MenuList>
    </Menu>
  )
}

function PaginationGroup ({ active, setActive }) {
  const getItemProps = (index) => ({
    className: active === index ? 'bg-gray-100 text-gray-900' : '',
    onClick: () => setActive(index)
  })

  const next = () => {
    if (active === 5) return

    setActive(active + 1)
  }

  const prev = () => {
    if (active === 1) return

    setActive(active - 1)
  }

  return (
    <ButtonGroup variant='outlined' className='hidden sm:block'>
      <IconButton onClick={prev}>
        <FaArrowLeftLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
      <IconButton {...getItemProps(1)}>1</IconButton>
      <IconButton {...getItemProps(2)}>2</IconButton>
      <IconButton {...getItemProps(3)}>3</IconButton>
      <IconButton {...getItemProps(4)}>4</IconButton>
      <IconButton {...getItemProps(5)}>5</IconButton>
      <IconButton onClick={next}>
        <FaArrowRightLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
    </ButtonGroup>
  )
}

function SimplePagination ({ active, setActive }) {
  const next = () => {
    if (active === 10) return

    setActive(active + 1)
  }

  const prev = () => {
    if (active === 1) return

    setActive(active - 1)
  }

  return (
    <div className='sm:hidden flex items-center gap-8'>
      <IconButton
        size='sm'
        variant='outlined'
        onClick={prev}
        disabled={active === 1}
      >
        <FaArrowLeftLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
      <Typography color='gray' className='font-normal'>
        Page <strong className='text-gray-900'>{active}</strong> of{' '}
        <strong className='text-gray-900'>10</strong>
      </Typography>
      <IconButton
        size='sm'
        variant='outlined'
        onClick={next}
        disabled={active === 10}
      >
        <FaArrowRightLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
    </div>
  )
}

export default function PurchasesSection () {
  const [active, setActive] = useState(1)
  return (
    <main className='w-full flex justify-center overflow-hidden p-8'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-8 m-0 mb-4'>
          <div className='w-full text-center'>
            <Typography variant='h1' color='black'>
              Purchases
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
        <CardBody className='overflow-x-scroll p-0 shadow-lg'>
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
                    <tr key={name} className='even:bg-[#F8F9FC]'>
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
                        <MenuCustomAnimation />
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className='flex items-center bg-white justify-center sm:justify-between border-t border-blue-gray-50 p-4'>
          <Typography variant='small' color='blue-gray' className='font-normal hidden sm:block'>
            Page 1 of 10
          </Typography>
          <PaginationGroup active={active} setActive={setActive} />
          <SimplePagination active={active} setActive={setActive} />
        </CardFooter>
      </Card>
    </main>
  )
}

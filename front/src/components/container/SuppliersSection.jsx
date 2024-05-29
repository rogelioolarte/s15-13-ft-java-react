import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
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
import SimplePagination from '../pure/pagination/SimplePagination'
import PaginationGroup from '../pure/pagination/PaginationGroup'

const TABLE_HEAD = ['checkbox', 'Business Name', 'Cuit N°', '']

const TABLE_ROWS = [
  {
    id: '11111',
    name: 'AText',
    cuit: '123123'
  },
  {
    id: '22222',
    name: 'BText',
    cuit: '456456'
  },
  {
    id: '33333',
    name: 'CText',
    cuit: '888888'
  },
  {
    id: '44444',
    name: 'DText',
    cuit: '444444'
  },
  {
    id: '55555',
    name: 'EText',
    cuit: '666666'
  },
  {
    id: '6',
    name: 'FText',
    cuit: '555555'
  },
  {
    id: '7',
    name: 'GText',
    cuit: '777777'
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
        <IconButton className='rounded bg-transparent shadow-none text-gray-900 text-lg hover:shadow-none hover:text-gray-800 transition-colors duration-300 ease-in-out'>
          <HiOutlineDotsVertical />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem>New</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Modify</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default function SuppliersSection () {
  const [active, setActive] = useState(1)
  return (
    <main className='w-full flex justify-center overflow-hidden p-8'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-5 m-0 mb-4'>
          <div className='w-full text-center'>
            <Typography variant='h2' color='black'>
              Suppliers
            </Typography>
          </div>
          <div className='w-full flex flex-col lg:flex-row items-center lg:justify-between gap-2'>
            <div className='w-full md:w-72'>
              <Input
                className='bg-white'
                label='Search'
                icon={<FaMagnifyingGlass className='h-5 w-5' />}
              />
            </div>
            <div className='flex gap-2 items-center'>
              <Button className='bg-[#D1D4FA] text-gray-900 shadow-none hover:shadow-none hover:bg-indigo-100 transition-all duration-300 ease-in-out'>NEW SUPPLIER</Button>
              <Button className='bg-[#D1D4FA] text-gray-900 shadow-none hover:shadow-none hover:bg-indigo-100 transition-all duration-300 ease-in-out'>DELETE SUPPLIERS</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <table className='w-full table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className='first:w-8 last:w-8 first:cursor-default last:cursor-default cursor-pointer bg-[#F1F3F9] p-4 transition-colors hover:bg-[#e4e7ee] first:hover:bg-[#F1F3F9] last:hover:bg-[#F1F3F9]'
                  >
                    <Typography
                      variant='small'
                      className='flex text-[#1D2433] font-semibold items-center gap-2 leading-none'
                    >
                      {head}{' '}
                      {(index !== 0 && index !== TABLE_HEAD.length - 1) && (
                        <LuChevronsUpDown strokeWidth={2} className='h-3 w-4' />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ id, name, cuit }) => {
                  const classes = 'px-4 text-[#1D2433]'
                  return (
                    <tr key={id} className='even:bg-[#F8F9FC] odd:bg-white'>
                      {/* select */}
                      <td className={classes}>
                        <div className='flex items-center gap-3'>
                          <div className='flex flex-col'>
                            <Checkbox
                              id={id}
                              ripple={false}
                              className='hover:before:opacity-0'
                              containerProps={{
                                className: 'p-0'
                              }}
                            />
                          </div>
                        </div>
                      </td>
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
                      {/* cuit */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {cuit}
                        </Typography>
                      </td>
                      {/* edit */}
                      <td className={classes + ' text-center'}>
                        <MenuCustomAnimation />
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
    </main>
  )
}

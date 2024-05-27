import { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  Button,
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
import SimplePagination from '../pure/pagination/SimplePagination'
import PaginationGroup from '../pure/pagination/PaginationGroup'

const TABLE_HEAD = ['Business Name', 'Cuit N°', '']

const TABLE_ROWS = [
  {
    name: 'AText',
    cuit: '123123'
  },
  {
    name: 'BText',
    cuit: '456456'
  },
  {
    name: 'CText',
    cuit: '888888'
  },
  {
    name: 'DText',
    cuit: '444444'
  },
  {
    name: 'EText',
    cuit: '666666'
  },
  {
    name: 'FText',
    cuit: '555555'
  },
  {
    name: 'GText',
    cuit: '777777'
  },
  {
    name: 'HText',
    cuit: '999999'
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
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-8 m-0 mb-4'>
          <div className='w-full text-center'>
            <Typography variant='h1' color='black'>
              Suppliers
            </Typography>
          </div>
          <div className='flex justify-between w-full'>
            <div className='w-full md:w-72'>
              <Input
                className='bg-white'
                label='Search'
                icon={<FaMagnifyingGlass className='h-5 w-5' />}
              />
            </div>
            <Button className='bg-[#D9D9D9] text-gray-900 shadow-none hover:shadow-none hover:bg-gray-300 transition-all duration-300 ease-in-out'>NEW SUPPLIER</Button>
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
                ({ name, cuit }, index) => {
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
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between p-4'>
          <PaginationGroup active={active} setActive={setActive} />
          <SimplePagination active={active} setActive={setActive} />
        </CardFooter>
      </Card>
    </main>
  )
}

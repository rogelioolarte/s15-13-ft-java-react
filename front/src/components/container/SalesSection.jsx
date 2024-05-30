import { useState, useEffect } from 'react'
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
  MenuItem,
  Button
} from '@material-tailwind/react'
import SimplePagination from '../pure/pagination/SimplePagination'
import PaginationGroup from '../pure/pagination/PaginationGroup'
import ModalConfirmationDelete from '../pure/ModalConfirmationDelete'
import { useSalesActions } from '../../hooks/useSalesActions'
import { useGetAllSalesMutation } from '../../store/apiSlice'
import { toast } from 'sonner'

const TABLE_HEAD = ['Invoice Date', 'Invoice No.', 'Customer', 'Products', 'Taxes', 'Total Price', '']

const TABLE_ROWS = [
  {
    invoiceDate: '24/04/18',
    invoiceNo: 'XXXXXX',
    customer: 'John Michael',
    productList: [{ name: 'Soap Mr.White', quantity: 10, price: 2, discount: 0 },
      { name: 'Sponge Lange', quantity: 2, price: 5, discount: 0.5 }],
    taxes: 1.8,
    total: 25.45
  },
  {
    invoiceDate: '24/04/18',
    invoiceNo: 'XXXXXX',
    customer: 'John Jackson',
    productList: [{ name: 'Meat 1kg', quantity: 1, price: 15, discount: 0 },
      { name: 'Tomato 1Kg', quantity: 1, price: 5, discount: 0.1 }],
    taxes: 1.8,
    total: 19.85
  },
  {
    invoiceDate: 'dd/MM/YYYY',
    invoiceNo: 'XXXXXX',
    customer: 'XXXXXX',
    productList: [{ name: 'XXXXXX', quantity: 0, price: 0, discount: 0 },
      { name: 'XXXXXX', quantity: 0, price: 0, discount: 0 }],
    taxes: 0,
    total: 0
  },
  {
    invoiceDate: 'dd/MM/YYYY',
    invoiceNo: 'XXXXXX',
    customer: 'XXXXXX',
    productList: [{ name: 'XXXXXX', quantity: 0, price: 0, discount: 0 },
      { name: 'XXXXXX', quantity: 0, price: 0, discount: 0 }],
    taxes: 0,
    total: 0
  },
  {
    invoiceDate: 'dd/MM/YYYY',
    invoiceNo: 'XXXXXX',
    customer: 'XXXXXX',
    productList: [{ name: 'XXXXXX', quantity: 0, price: 0, discount: 0 },
      { name: 'XXXXXX', quantity: 0, price: 0, discount: 0 }],
    taxes: 0,
    total: 0
  },
  {
    invoiceDate: 'dd/MM/YYYY',
    invoiceNo: 'XXXXXX',
    customer: 'XXXXXX',
    productList: [{ name: 'XXXXXX', quantity: 0, price: 0, discount: 0 },
      { name: 'XXXXXX', quantity: 0, price: 0, discount: 0 }],
    taxes: 0,
    total: 0
  }
]

function MenuCustomAnimation ({ handleOpen }) {
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
        <MenuItem>See More</MenuItem>
      </MenuList>
    </Menu>
  )
}

function formatProductList (productList) {
  return productList.map(product => `${product.name} x ${product.quantity}`).join(', ')
}

export default function SalesSection () {
  const [active, setActive] = useState(1)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const { sales, useInitSales } = useSalesActions()
  const TABLE_DATA = sales.length !== 0 ? sales : TABLE_ROWS
  const defaultDate = { from: 'first', to: 'last' }
  const { data: salesList, isLoading, isSuccess, isError, error } = useGetAllSalesMutation(defaultDate)

  useEffect(() => {
    if (isLoading) {
      console.log('Loading - Poner un espiner en la tabla')
    } else if (isSuccess) {
      useInitSales(salesList)
    } else if (isError) {
      toast.error(`Error while conecting: ${error}`)
    }
  }, [])

  return (
    <main className='w-full h-[100%] flex justify-center overflow-hidden p-2'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-3 m-0 mb-4'>
          <div className='w-full text-center'>
            <Typography variant='h1' color='black'>
              Sales
            </Typography>
          </div>
          <div className='gap-10 flex justify-between'>
            <div className='w-full md:w-72'>
              <Input
                className='bg-white'
                label='Search by Costumer'
                icon={<FaMagnifyingGlass className='h-5 w-5' />}
              />
            </div>
            <Button className='bg-secondary-40 py-4 text-gray-900'>Add New Sale</Button>
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
              {TABLE_DATA.map(
                ({ invoiceDate, invoiceNo, customer, productList, taxes, total }, index) => {
                  const classes = 'p-2 text-[#1D2433]'
                  return (
                    <tr key={index} className='even:bg-[#F8F9FC] odd:bg-white'>
                      {/* name */}
                      <td className={classes}>
                        <div className='flex items-center gap-2'>
                          <div className='flex flex-col'>
                            <Typography
                              variant='small'
                              className='font-normal'
                            >
                              {invoiceDate}
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
                          {invoiceNo}
                        </Typography>
                      </td>
                      {/* code */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {customer}
                        </Typography>
                      </td>
                      {/* saleDate */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {formatProductList(productList)}
                        </Typography>
                      </td>
                      {/* invoiceNo */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {taxes}%
                        </Typography>
                      </td>
                      {/* total */}
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          ${total}
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
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between py-1 px-3'>
          <PaginationGroup active={active} setActive={setActive} />
          <SimplePagination active={active} setActive={setActive} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete handleOpen={handleOpen} open={open} />
    </main>
  )
}

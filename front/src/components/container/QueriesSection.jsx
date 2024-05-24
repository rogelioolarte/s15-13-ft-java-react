import { FaMagnifyingGlass } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react'

const TABS = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Monitored',
    value: 'monitored'
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored'
  }
]

const TABLE_HEAD = ['Cliente', 'Producto', 'Código', 'Fecha de Venta', 'Factura Nº', 'Fecha de Factura', '']

const TABLE_ROWS = [
  {
    // img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: 'John Michael',
    product: 'john@creative-tim.com',
    code: 'Manager',
    fechaVenta: '23/04/18',
    numFactura: true,
    fechaFactura: '23/04/18'
  },
  {
    // img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: 'Alexa Liras',
    product: 'alexa@creative-tim.com',
    code: 'Programator',
    fechaVenta: '23/04/18',
    numFactura: false,
    fechaFactura: '23/04/18'
  },
  {
    // img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: 'Laurent Perrier',
    product: 'laurent@creative-tim.com',
    code: 'Executive',
    fechaVenta: '23/04/18',
    numFactura: false,
    fechaFactura: '19/09/17'
  },
  {
    // img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: 'Michael Levi',
    product: 'michael@creative-tim.com',
    code: 'Programator',
    fechaVenta: '23/04/18',
    numFactura: true,
    fechaFactura: '24/12/08'
  },
  {
    // img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: 'Richard Gran',
    product: 'richard@creative-tim.com',
    code: 'Manager',
    fechaVenta: '23/04/18',
    numFactura: false,
    fechaFactura: '04/10/21'
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
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default function QueriesSection () {
  return (
    <main className='w-full flex justify-center overflow-hidden p-8'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-8 m-0 mb-4'>
          <div className='w-full text-center'>
            <Typography variant='h1' color='black'>
              Consultas
            </Typography>
          </div>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <Tabs value='all' className='w-full md:w-max'>
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className='w-full md:w-72'>
              <Input
                label='Search'
                icon={<FaMagnifyingGlass className='h-5 w-5' />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className='overflow-scroll p-0'>
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
                ({ name, product, code, fechaVenta, numFactura, fechaFactura }, index) => {
                  const classes = 'p-4 text-[#1D2433]'
                  return (
                    <tr key={name} className='even:bg-[#F8F9FC]'>
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
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {product}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {code}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {fechaVenta}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className='w-max'>
                          <Chip
                            variant='ghost'
                            size='sm'
                            value={numFactura ? 'online' : 'offline'}
                            color={numFactura ? 'green' : 'blue-gray'}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {fechaFactura}
                        </Typography>
                      </td>
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
        <CardFooter className='flex items-center bg-white justify-between border-t border-blue-gray-50 p-4'>
          <Typography variant='small' color='blue-gray' className='font-normal'>
            Page 1 of 10
          </Typography>
          <div className='flex gap-2'>
            <Button variant='outlined' size='sm'>
              Previous
            </Button>
            <Button variant='outlined' size='sm'>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

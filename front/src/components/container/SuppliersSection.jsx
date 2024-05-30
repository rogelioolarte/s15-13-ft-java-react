import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import SimplePagination from '../pure/pagination/SimplePagination'
import PaginationGroup from '../pure/pagination/PaginationGroup'
import { useSuppliersActions } from '../../hooks/useSuppliersActions.js'
import { useGetAllSuppliersQuery } from '../../store/apiSlice'
import SuppliersTable from './SuppliersTable'
import SuppliersHeader from './SuppliersHeader.jsx'

const TABLE_HEAD = ['checkbox', 'Supplier Name', 'Company Code N°', '']

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

export default function SuppliersSection () {
  const [active, setActive] = useState(1)
  const { suppliers, useInitSuppliers } = useSuppliersActions()
  const TABLE_DATA = suppliers.length !== 0 ? suppliers : TABLE_ROWS
  const { data: suppliersData, isLoading, isSuccess, isError, error } = useGetAllSuppliersQuery()

  useEffect(() => {
    if (suppliers.length === 0) {
      if (isLoading) {
        console.log('Loading - Poner un espiner en la tabla')
      } else if (isSuccess) {
        useInitSuppliers(suppliersData)
      } else if (isError) {
        toast.success(`Error while conecting: ${error}`)
      }
    }
  }, [])
  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-4'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-5 m-0 mb-4'>
          <SuppliersHeader />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <SuppliersTable TABLE_ROWS={TABLE_DATA} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup active={active} setActive={setActive} />
          <SimplePagination active={active} setActive={setActive} />
        </CardFooter>
      </Card>
    </main>
  )
}

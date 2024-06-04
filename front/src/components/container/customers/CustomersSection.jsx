import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import CustomersTable from './CustomersTable'
import CustomersHeader from './CustomersHeader'
import { useCustomersActions } from '../../../hooks/useCustomersActions.js'
import { useGetAllCustomersQuery, useDeleteCustomerMutation } from '../../../store/apiSlice.js'

const TABLE_HEAD = [
  {
    head: 'checkbox',
    row: 'checkbox'
  },
  {
    head: 'Customer',
    row: 'name'
  },
  {
    head: 'Code',
    row: 'personalCode'
  },
  {
    head: 'Customer',
    row: 'customerType'
  },
  {
    head: '',
    row: 'actions'
  }
]
const TABLE_ROWS = [
  {
    id: '11111',
    name: 'ACustom',
    personalCode: '123123',
    customerType: 'customer1'
  },
  {
    id: '22222',
    name: 'BCustom',
    personalCode: '456456',
    customerType: 'customer2'
  },
  {
    id: '33333',
    name: 'CCustom',
    personalCode: '678678',
    customerType: 'customer3'
  },
  {
    id: '44444',
    name: 'DCustom',
    personalCode: '444444',
    customerType: 'customer4'
  },
  {
    id: '55555',
    name: 'EACustom',
    personalCode: '666666',
    customerType: 'customer5'
  },
  {
    id: '6',
    name: 'FECustom',
    personalCode: '345345',
    customerType: 'customer1'
  },
  {
    id: '7',
    name: 'GFCustom',
    personalCode: '777777',
    customerType: 'customer2'
  }
]

export default function CustomersSection () {
  const [customerDelete] = useDeleteCustomerMutation()
  const { customers, useInitCustomers } = useCustomersActions()
  const TABLE_DATA = customers.length !== 0 ? customers : TABLE_ROWS
  const { data: customersData, isLoading, isSuccess, isError, error } = useGetAllCustomersQuery()

  useEffect(() => {
    if (isLoading) {
      console.log('Loading - Poner un espiner en la tabla')
    } else if (isSuccess) {
      useInitCustomers(customersData)
    } else if (isError) {
      toast.error(`Error while conecting: ${error}`)
    }
  }, [])

  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))
  const { useDeleteCustomerById } = useCustomersActions()
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState(TABLE_DATA.slice())
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const selectedItems = checkedItems.filter((value) => value === true)

  const findSelectedCustomer = () => {
    const index = checkedItems.findIndex((value) => value === true)
    return TABLE_DATA[index]
  }

  const getSelectedCustomers = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? TABLE_DATA[index] : null))
      .filter(customer => customer !== null)
  }

  const handleDelete = async () => {
    const customers = getSelectedCustomers()
    if (customers) {
      customers.map(async (customer) => {
        await customerDelete(customer.id).then((res) => {
          console.log(res)
          if (res.status === 201) {
            useDeleteCustomerById(customer.id)
            setIsDeleteConfirmationOpen(false)
          }
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  }

  const handleOpen = () => setOpen(!open)

  const handleSearch = (searchTerm) => {
    const filteredCustomers = TABLE_DATA.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.personalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredCustomers)
  }

  const customerToEdit = selectedItems.length === 1 && findSelectedCustomer()

  useEffect(() => {
    // Restablecer customers seleccionados al cambiar de página
    setCheckedItems(new Array(TABLE_DATA.length).fill(false))
  }, [page])

  const customersPerPage = 7
  const startIndex = (page - 1) * customersPerPage
  const endIndex = Math.min(startIndex + customersPerPage, TABLE_DATA.length)

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedRows = [...searchFilter].sort((a, b) => {
    if (!sortConfig) return TABLE_DATA

    const { key, direction } = sortConfig

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      // Orden alfabético
      return direction === 'ascending' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
    } else {
      // Orden numérico
      return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key]
    }
  })

  const visibleCustomers = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(TABLE_DATA.length / customersPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <CustomersHeader onSearch={handleSearch} customerToEdit={customerToEdit} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <CustomersTable TABLE_DATA={visibleCustomers} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} handleOpen={handleOpen} />
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'customers' : 'customer'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
    </main>
  )
}

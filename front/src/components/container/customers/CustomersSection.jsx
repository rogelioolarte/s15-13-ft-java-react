import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter, Spinner } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import CustomersTable from './CustomersTable'
import { useDeleteCustomerMutation, useGetAllCustomersQuery } from '../../../store/apiSlice.js'
import CustomersHeader from './CustomersHeader.jsx'
import { useCustomersActions } from '../../../hooks/useCustomersActions.js'

const TABLE_HEAD = [
  { head: 'checkbox', row: 'checkbox' },
  { head: 'Customer Name', row: 'name' },
  { head: 'Personal Code N°', row: 'personalCode' },
  { head: 'Customer Type', row: 'customerType' },
  { head: '', row: 'actions' }
]

export default function CustomersSection () {
  const [deleteCustomer] = useDeleteCustomerMutation()
  const { customers, useInitCustomers, useDeleteCustomerById } = useCustomersActions()
  const { data: customersData, isLoading, isSuccess, isError, error } = useGetAllCustomersQuery()
  const [checkedItems, setCheckedItems] = useState([])
  const selectedItems = checkedItems.filter(value => value === true)
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' })
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState([])
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  useEffect(() => {
    if (isSuccess && !isLoading) {
      useInitCustomers(customersData)
    } else if (isError) {
      toast.error(`Error while connecting: ${error}`)
    }
  }, [isLoading, isSuccess])

  useEffect(() => {
    setSearchFilter(customers)
    setCheckedItems(new Array(customers.length).fill(false))
  }, [customers])

  const findSelectedCustomer = () => {
    const index = checkedItems.findIndex(value => value === true)
    return customers[index]
  }

  const getSelectedCustomers = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? customers[index] : null))
      .filter(customer => customer !== null)
  }

  const handleDelete = async () => {
    const customersToDelete = getSelectedCustomers()
    if (customersToDelete.length) {
      for (const customer of customersToDelete) {
        await deleteCustomer(customer.id).then((res) => {
          if (res.status === 201) {
            useDeleteCustomerById(customer.id)
            setIsDeleteConfirmationOpen(false)
          }
        }).catch((error) => {
          toast.error(`Error deleting customer: ${error}`)
        })
      }
    }
  }

  const handleOpen = () => setOpen(!open)

  const handleSearch = (searchTerm) => {
    const filteredCustomers = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.personalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredCustomers)
  }

  const customerToEdit = selectedItems.length === 1 && findSelectedCustomer()

  const customersPerPage = 7
  const startIndex = (page - 1) * customersPerPage
  const endIndex = Math.min(startIndex + customersPerPage, searchFilter.length)

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === (key) && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedRows = [...searchFilter].sort((a, b) => {
    if (!sortConfig.key.length) return 0
    const { key, direction } = sortConfig
    const dirMultiplier = direction === 'ascending' ? 1 : -1
    const valA = a[key] != null ? a[key] : '' // Handle null/undefined values
    const valB = b[key] != null ? b[key] : '' // Handle null/undefined values

    let comparison = 0
    if (typeof valA === 'string' && typeof valB === 'string') {
      comparison = valA.localeCompare(valB)
    } else if (typeof valA === 'number' && typeof valB === 'number') {
      comparison = valA - valB
    } else {
      comparison = valA.toString().localeCompare(valB.toString())
    }

    if (comparison !== 0) {
      return dirMultiplier * comparison
    }
    return 0
  })

  const visibleCustomers = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilter.length / customersPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <CustomersHeader onSearch={handleSearch} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg flex justify-center items-center'>
          {isLoading
            ? (<div className='w-full h-[200px] flex items-center justify-center bg-white'><Spinner className='h-16 w-16 text-gray-900/50' /></div>)
            : <CustomersTable TABLE_DATA={visibleCustomers} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} handleOpen={handleOpen} customerToEdit={customerToEdit} />}
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

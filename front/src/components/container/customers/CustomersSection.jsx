import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Spinner } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import DynamicTable from '../../pure/DynamicTable.jsx'
import { useDeleteCustomerMutation, useGetAllCustomersQuery } from '../../../store/apiSlice.js'
import CustomersHeader from './CustomersHeader.jsx'
import { useCustomersActions } from '../../../hooks/useCustomersActions.js'
import { useManageAPI } from '../../../hooks/useManageAPI.js'

const TABLE_HEAD = [
  { key: 'select', label: '', type: 'checkbox' },
  { key: 'name', label: 'Customer Name', type: 'text', sortable: true },
  { key: 'personalCode', label: 'Personal Code', type: 'text', sortable: true },
  { key: 'customerType', label: 'Customer Type', type: 'text', sortable: true },
  { key: 'actions', label: 'Actions', type: 'actions' }
]

export default function CustomersSection () {
  const [deleteCustomer] = useDeleteCustomerMutation()
  const { customers, useInitCustomers, useDeleteCustomerById } = useCustomersActions()
  const { data: customersData, isLoading, isSuccess, isError, error } = useGetAllCustomersQuery()
  const [checkedItems, setCheckedItems] = useState([])
  const selectedItems = checkedItems.filter(value => value === true)
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' })
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState([])
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  const { initAllEntities: useInitCustomersGetAll, deleteEntities: useDeleteCustomers } = useManageAPI(
    'Customer',
    useInitCustomers,
    customersData,
    isLoading,
    isSuccess,
    isError,
    error,
    deleteCustomer,
    useDeleteCustomerById
  )

  useEffect(() => {
    useInitCustomersGetAll()
  }, [isLoading, isSuccess])

  useEffect(() => {
    setSearchFilter(customers)
    setCheckedItems(new Array(customers.length).fill(false))
  }, [customers])

  const getSelectedCustomers = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? customers[index] : null))
      .filter(customer => customer !== null)
  }

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(!useDeleteCustomers(getSelectedCustomers()))
  }

  const handleSearch = (searchTerm) => {
    const filteredCustomers = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.personalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredCustomers)
  }

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
    if (!sortConfig) return 0

    const { key, direction } = sortConfig

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return direction === 'ascending' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
    } else {
      return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key]
    }
  })

  const visibleCustomers = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilter.length / customersPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <CustomersHeader onSearch={handleSearch} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className={`tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg ${isLoading && 'flex justify-center items-center'}`}>
          {isLoading
            ? (<div className='w-full h-[200px] flex items-center justify-center bg-white'><Spinner className='h-16 w-16 text-gray-900/50' /></div>)
            : <DynamicTable TABLE_DATA={visibleCustomers} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} typeModalView='Customer' />}
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

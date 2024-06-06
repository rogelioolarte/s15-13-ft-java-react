import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter, Spinner } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import SuppliersTable from './SuppliersTable'
import SuppliersHeader from './SuppliersHeader'
import { useSuppliersActions } from '../../../hooks/useSuppliersActions.js'
import { useGetAllSuppliersQuery, useDeleteSupplierMutation } from '../../../store/apiSlice.js'

const TABLE_HEAD = [
  { head: 'checkbox', row: 'checkbox' },
  { head: 'Supplier Name', row: 'name' },
  { head: 'Company Code N°', row: 'companyCode' },
  { head: '', row: 'actions' }
]

export default function SuppliersSection () {
  const [deleteSupplier] = useDeleteSupplierMutation()
  const { suppliers, useInitSuppliers, useDeleteSupplierById } = useSuppliersActions()
  const { data: suppliersData, isLoading, isSuccess, isError, error } = useGetAllSuppliersQuery()
  const [checkedItems, setCheckedItems] = useState([])
  const selectedItems = checkedItems.filter(value => value === true)
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState([])
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  useEffect(() => {
    if (isSuccess && !isLoading) {
      useInitSuppliers(suppliersData)
    } else if (isError) {
      toast.error(`Error while connecting: ${error}`)
    }
  }, [isLoading, isSuccess])

  useEffect(() => {
    setSearchFilter(suppliers.slice())
    setCheckedItems(new Array(suppliers.length).fill(false))
  }, [suppliers])
  // console.log(suppliers)
  const getSelectedSuppliers = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? suppliers[index] : null))
      .filter(supplier => supplier !== null)
  }

  const handleDelete = async () => {
    const suppliersToDelete = getSelectedSuppliers()
    if (suppliersToDelete.length) {
      for (const supplier of suppliersToDelete) {
        await deleteSupplier(supplier.id).then((res) => {
          if (res.status === 201) {
            useDeleteSupplierById(supplier.id)
            setIsDeleteConfirmationOpen(false)
          }
        }).catch((error) => {
          toast.error(`Error deleting supplier: ${error}`)
        })
      }
    }
  }

  const handleSearch = (searchTerm) => {
    const filteredSuppliers = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.companyCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredSuppliers)
  }

  const suppliersPerPage = 7
  const startIndex = (page - 1) * suppliersPerPage
  const endIndex = Math.min(startIndex + suppliersPerPage, searchFilter.length)

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
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

  const visibleSuppliers = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilter.length / suppliersPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <SuppliersHeader onSearch={handleSearch} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg flex justify-center items-center'>
          {isLoading
            ? (<div className='w-full h-[200px] flex items-center justify-center bg-white'><Spinner className='h-16 w-16 text-gray-900/50' /></div>)
            : <SuppliersTable TABLE_DATA={visibleSuppliers} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} />}
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'suppliers' : 'supplier'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
    </main>
  )
}

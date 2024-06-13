import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Spinner } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import DynamicTable from '../../pure/DynamicTable.jsx'
import { useTaxesActions } from '../../../hooks/useTaxesActions.js'
import TaxesHeader from './TaxesHeader.jsx'
import { useDeleteTaxMutation, useGetAllTaxesQuery } from '../../../store/apiSlice.js'
import { useManageAPI } from '../../../hooks/useManageAPI.js'

const TABLE_HEAD = [
  { key: 'select', label: '', type: 'checkbox' },
  { key: 'name', label: 'Tax Name', type: 'text', sortable: true },
  { key: 'percentage', label: 'Percentage', type: 'percentage', sortable: true },
  { key: 'actions', label: 'Actions', type: 'actions' }
]

export default function TaxesSection () {
  const { useInitTaxes, useDeleteTaxById, taxes } = useTaxesActions()
  const [deleteTax] = useDeleteTaxMutation()
  const { data: taxesData, isLoading, isSuccess, isError, error } = useGetAllTaxesQuery()
  const [checkedItems, setCheckedItems] = useState([])
  const selectedItems = checkedItems.filter(value => value === true)
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState([])
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  const { initAllEntities: useInitTaxesGetAll, deleteEntities: useDeleteTaxes } = useManageAPI(
    'Tax',
    useInitTaxes,
    taxesData,
    isLoading,
    isSuccess,
    isError,
    error,
    deleteTax,
    useDeleteTaxById
  )

  useEffect(() => {
    useInitTaxesGetAll()
  }, [])

  useEffect(() => {
    setSearchFilter(taxes.slice())
    setCheckedItems(new Array(taxes.length).fill(false))
  }, [taxes])

  const getSelectedTaxes = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? taxes[index] : null))
      .filter(tax => tax !== null)
  }

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(!useDeleteTaxes(getSelectedTaxes()))
  }

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const filteredTaxes = taxes.filter(tax =>
      tax.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      tax.percentage.toString().includes(searchTerm)
    )
    setSearchFilter(filteredTaxes)
  }

  const taxesPerPage = 7
  const startIndex = (page - 1) * taxesPerPage
  const endIndex = Math.min(startIndex + taxesPerPage, searchFilter.length)

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

  const visibleTaxes = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilter.length / taxesPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <TaxesHeader onSearch={handleSearch} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className={`tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg ${isLoading && 'flex justify-center items-center'}`}>
          {isLoading
            ? (<div className='w-full h-[200px] flex items-center justify-center bg-white'><Spinner className='h-16 w-16 text-gray-900/50' /></div>)
            : <DynamicTable TABLE_DATA={visibleTaxes} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} typeModalView='Tax' />}
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'taxes' : 'tax'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
    </main>
  )
}

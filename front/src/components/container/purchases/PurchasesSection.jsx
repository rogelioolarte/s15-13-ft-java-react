import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter, Spinner } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import { useGetPurchasesQuery } from '../../../store/apiSlice.js'
import DynamicTable from '../../pure/DynamicTable.jsx'
import { usePurchasesActions } from '../../../hooks/usePurchasesActions.js'
import PurchasesHeader from './PurchasesHeader.jsx'
import { useProductsActions } from '../../../hooks/useProductsActions.js'

const TABLE_HEAD = [
  { key: 'bill', label: 'Bill Code', type: 'text', sortable: true },
  { key: 'date', label: 'Date', type: 'date', sortable: true },
  { key: 'supplier', label: 'Supplier Name', type: 'supplierObject' },
  { key: 'productList', label: 'Products List', type: 'productList' },
  { key: 'total', label: 'Total', type: 'number', sortable: true },
  { key: 'actions', label: 'Actions', type: 'actions' }
]

export default function SalesSection () {
  const { purchases, useInitPurchases } = usePurchasesActions()
  const { products } = useProductsActions()
  const { data: purchasesData, isLoading, isSuccess, isError, error } = useGetPurchasesQuery()
  const [checkedItems, setCheckedItems] = useState([])
  const selectedItems = checkedItems.filter(value => value === true)
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState([])

  useEffect(() => {
    if (isSuccess && !isLoading) {
      useInitPurchases(purchasesData, products)
      toast.success('Purchase Data successfully added', { duration: 1500, closeButton: true })
    } else if (isError) {
      toast.error(`Error while connecting: ${error}`, { duration: 2000 })
    }
  }, [isLoading, isSuccess])

  useEffect(() => {
    setSearchFilter(purchases.slice())
    setCheckedItems(new Array(purchases.length).fill(false))
  }, [purchases])

  const handleSearch = (searchTerm) => {
    const filteredPurchases = purchases.filter(purchase =>
      purchase.bill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.total.toString().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredPurchases)
  }

  const purchasesPerPage = 7
  const startIndex = (page - 1) * purchasesPerPage
  const endIndex = Math.min(startIndex + purchasesPerPage, searchFilter.length)

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

  const visiblePurchases = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilter.length / purchasesPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <PurchasesHeader onSearch={handleSearch} selectedItems={selectedItems} />
        </CardHeader>
        <CardBody className={`tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg ${isLoading && 'flex justify-center items-center'}`}>
          {isLoading
            ? (<div className='w-full h-[200px] flex items-center justify-center bg-white'><Spinner className='h-16 w-16 text-gray-900/50' /></div>)
            : <DynamicTable TABLE_DATA={visiblePurchases} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} typeModalView='Purchase' />}
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
    </main>
  )
}

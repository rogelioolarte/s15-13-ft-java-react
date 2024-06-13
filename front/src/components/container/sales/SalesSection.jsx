import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter, Spinner } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import { useGetSalesQuery } from '../../../store/apiSlice.js'
import DynamicTable from '../../pure/DynamicTable.jsx'
import { useSalesActions } from '../../../hooks/useSalesActions.js'
import SalesHeader from './SalesHeader.jsx'
import { useCustomersActions } from '../../../hooks/useCustomersActions.js'

const TABLE_HEAD = [
  { key: 'date', label: 'Date', type: 'date', sortable: true },
  { key: 'customer', label: 'Customer', type: 'customerObject' },
  { key: 'products', label: 'Products List', type: 'products' },
  { key: 'tax', label: 'Tax', type: 'taxObject' },
  { key: 'total', label: 'Total', type: 'number', sortable: true },
  { key: 'actions', label: 'Actions', type: 'actions' }
]

export default function SalesSection () {
  const { sales, useInitSales } = useSalesActions()
  const { customers } = useCustomersActions()
  const { data: salesData, isLoading, isSuccess, isError, error } = useGetSalesQuery()
  const [checkedItems, setCheckedItems] = useState([])
  const selectedItems = checkedItems.filter(value => value === true)
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState([])

  useEffect(() => {
    if (isSuccess && !isLoading) {
      useInitSales(salesData, customers)
      toast.success('Sale Data successfully added', { duration: 1500, closeButton: true })
    } else if (isError) {
      toast.error(`Error while connecting: ${error}`, { duration: 2000 })
    }
  }, [isLoading, isSuccess])

  useEffect(() => {
    setSearchFilter(sales.slice())
    setCheckedItems(new Array(sales.length).fill(false))
  }, [sales])

  const handleSearch = (searchTerm) => {
    const filteredsSales = sales.filter(sale =>
      sale.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.tax.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredsSales)
  }

  const salesPerPage = 7
  const startIndex = (page - 1) * salesPerPage
  const endIndex = Math.min(startIndex + salesPerPage, searchFilter.length)

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
    // Función para obtener el valor anidado
    const getValueByKey = (obj, key) => {
      return key.split('.').reduce((o, k) => (o ? o[k] : undefined), obj)
    }
    const valueA = getValueByKey(a, key)
    const valueB = getValueByKey(b, key)
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else {
      return direction === 'ascending' ? valueA - valueB : valueB - valueA
    }
  })

  const visibleSales = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilter.length / salesPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <SalesHeader onSearch={handleSearch} selectedItems={selectedItems} />
        </CardHeader>
        <CardBody className={`tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg ${isLoading && 'flex justify-center items-center'}`}>
          {isLoading
            ? (<div className='w-full h-[200px] flex items-center justify-center bg-white'><Spinner className='h-16 w-16 text-gray-900/50' /></div>)
            : <DynamicTable TABLE_DATA={visibleSales} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} typeModalView='Sale' />}
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
    </main>
  )
}

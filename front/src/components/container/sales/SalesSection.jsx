import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import SimplePagination from '../../pure/pagination/SimplePagination'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import { useSalesActions } from '../../../hooks/useSalesActions'
import { useGetAllSalesMutation } from '../../../store/apiSlice'
import { toast } from 'sonner'
import SalesHeader from './SalesHeader'
import { SalesTable } from './SalesTable'

const TABLE_HEAD = [
  {
    head: 'checkbox',
    row: 'checkbox'
  },
  {
    head: 'Invoice Date',
    row: 'invoiceDate'
  },
  {
    head: 'Invoice No.',
    row: 'invoiceNo'
  },
  {
    head: 'Customer',
    row: 'customer'
  },
  {
    head: 'Products',
    row: 'productList'
  },
  {
    head: 'Taxes',
    row: 'taxes'
  },
  {
    head: 'Total Price',
    row: 'total'
  },
  {
    head: '',
    row: 'actions'
  }
]
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

export default function SalesSection () {
  const { sales, useInitSales } = useSalesActions()
  const TABLE_DATA = sales.length !== 0 ? sales : TABLE_ROWS
  const defaultDate = { from: 'first', to: 'last' }
  const { data: salesList, isLoading, isSuccess, isError, error } = useGetAllSalesMutation(defaultDate)
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState(TABLE_DATA.slice())
  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_DATA.length).fill(false))
  // const selectedItems = checkedItems.filter((value) => value === true)

  useEffect(() => {
    if (isLoading) {
      console.log('Loading - Poner un espiner en la tabla')
    } else if (isSuccess) {
      useInitSales(salesList)
    } else if (isError) {
      toast.error(`Error while conecting: ${error}`)
    }
  }, [])

  const handleOpen = () => setOpen(!open)

  const handleSearch = (searchTerm) => {
    const filteredProducts = TABLE_DATA.filter(product =>
      product.invoiceDate.toString().includes(searchTerm) ||
      product.invoiceNo.toString().includes(searchTerm) ||
      product.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.total.toString().includes(searchTerm)
    )
    setSearchFilter(filteredProducts)
  }

  useEffect(() => {
    // Restablecer productos seleccionados al cambiar de página
    setCheckedItems(new Array(TABLE_DATA.length).fill(false))
  }, [page])

  const productsPerPage = 7
  const startIndex = (page - 1) * productsPerPage
  const endIndex = Math.min(startIndex + productsPerPage, TABLE_DATA.length)

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

  const visibleProducts = sortedRows.slice(startIndex, endIndex)
  const itemsPerPage = 7
  const totalPages = Math.ceil(TABLE_DATA.length / itemsPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <SalesHeader onSearch={handleSearch} />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <SalesTable TABLE_DATA={visibleProducts} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} handleOpen={handleOpen} />
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
    </main>
  )
}

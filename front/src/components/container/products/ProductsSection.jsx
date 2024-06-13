import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Spinner } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../store/apiSlice'
import { useProductsActions } from '../../../hooks/useProductsActions'
import ProductsHeader from './ProductsHeader'
import DynamicTable from '../../pure/DynamicTable'
import { useManageAPI } from '../../../hooks/useManageAPI'

// { head: 'Description', row: 'description' },
const TABLE_HEAD = [
  { key: 'select', label: '', type: 'checkbox' },
  { key: 'name', label: 'Product Name', type: 'text', sortable: true },
  { key: 'barcode', label: 'BarCode', type: 'text', sortable: true },
  { key: 'salePrice', label: 'Sell Price', type: 'cash', sortable: true },
  { key: 'minimal', label: 'Minimal Stock', type: 'number', sortable: true },
  { key: 'stock', label: 'Actual Stock', type: 'number', sortable: true },
  { key: 'actions', label: 'Actions', type: 'actions' }
]

export default function ProductsSection () {
  const [deleteProduct] = useDeleteProductMutation()
  const { products, useInitProducts, useDeleteProductById } = useProductsActions()
  const { data: productsData, isLoading, isSuccess, isError, error } = useGetAllProductsQuery()
  const [checkedItems, setCheckedItems] = useState([])
  const selectedItems = checkedItems.filter(value => value === true)
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [searchFilter, setSearchFilter] = useState([])
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  const { initAllEntities: useInitProductsGetAll, deleteEntities: useDeleteProducts } = useManageAPI(
    'Product',
    useInitProducts,
    productsData,
    isLoading,
    isSuccess,
    isError,
    error,
    deleteProduct,
    useDeleteProductById
  )

  useEffect(() => {
    useInitProductsGetAll()
  }, [isLoading, isSuccess])

  useEffect(() => {
    setSearchFilter(products.slice())
    setCheckedItems(new Array(products.length).fill(false))
  }, [products])

  const getSelectedProducts = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? products[index] : null))
      .filter(product => product !== null)
  }

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(!useDeleteProducts(getSelectedProducts()))
  }

  const handleSearch = (searchTerm) => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.salePrice.toString().includes(searchTerm)
    )
    setSearchFilter(filteredProducts)
  }

  const productsPerPage = 7
  const startIndex = (page - 1) * productsPerPage
  const endIndex = Math.min(startIndex + productsPerPage, searchFilter.length)

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

  const visibleProducts = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilter.length / productsPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <ProductsHeader onSearch={handleSearch} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className={`tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg ${isLoading && 'flex justify-center items-center'}`}>
          {isLoading
            ? (<div className='w-full h-[200px] flex items-center justify-center bg-white'><Spinner className='h-16 w-16 text-gray-900/50' /></div>)
            : <DynamicTable TABLE_DATA={visibleProducts} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} typeModalView='Product' />}
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'products' : 'product'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
    </main>
  )
}

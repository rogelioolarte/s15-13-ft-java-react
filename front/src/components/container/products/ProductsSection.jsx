import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import ProductsTable from './ProductsTable'
import ProductsHeader from './ProductsHeader'
import { useProductsActions } from '../../../hooks/useProductsActions.js'
import { useGetAllProductsQuery, useDeleteProductMutation } from '../../../store/apiSlice.js'

const TABLE_HEAD = [
  {
    head: 'checkbox',
    row: 'checkbox'
  },
  {
    head: 'Product',
    row: 'name'
  },
  {
    head: 'Code',
    row: 'barcode'
  },
  {
    head: 'Description',
    row: 'description'
  },
  {
    head: 'Sell Price',
    row: 'salePrice'
  },
  {
    head: 'Minimal Stock',
    row: 'minimal'
  },
  {
    head: 'Stock',
    row: 'stock'
  },
  {
    head: '',
    row: 'actions'
  }
]
const TABLE_ROWS = [
  {
    id: '1',
    name: 'Producto 1',
    barcode: 'F006',
    description: 'La descripcion',
    salePrice: 180,
    minimal: 15,
    stock: 3
  },
  {
    id: '2',
    name: 'Producto 2',
    barcode: 'G007',
    description: 'La descripcion',
    salePrice: 220,
    minimal: 8,
    stock: 3
  },
  {
    id: '3',
    name: 'Producto 3',
    barcode: 'H008',
    description: 'La descripcion',
    salePrice: 120,
    minimal: 25,
    stock: 3
  },
  {
    id: '4',
    name: 'Producto 4',
    barcode: 'A009',
    description: 'La descripcion',
    salePrice: 350,
    minimal: 30,
    stock: 3
  },
  {
    id: '5',
    name: 'Producto 5',
    barcode: 'J010',
    description: 'La descripcion',
    salePrice: 280,
    minimal: 18,
    stock: 3
  },
  {
    id: '6',
    name: 'Producto 6',
    barcode: 'K011',
    description: 'Una descripcion',
    salePrice: 200,
    minimal: 11,
    stock: 3
  },
  {
    id: '7',
    name: 'Producto 7',
    barcode: 'L012',
    description: 'La descripcion',
    salePrice: 320,
    minimal: 6,
    stock: 3
  },
  {
    id: '8',
    name: 'Producto 8',
    barcode: 'M013',
    description: 'La descripcion',
    salePrice: 140,
    minimal: 22,
    stock: 3
  },
  {
    id: '9',
    name: 'Producto 9',
    barcode: 'N014',
    description: 'La descripcion',
    salePrice: 270,
    minimal: 9,
    stock: 3
  },
  {
    id: '10',
    name: 'Producto 10',
    barcode: 'O010',
    description: 'La descripcion',
    salePrice: 190,
    minimal: 14,
    stock: 3
  },
  {
    id: '11',
    name: 'Producto 11',
    barcode: 'P011',
    description: 'Una descripcion',
    salePrice: 270,
    minimal: 6,
    stock: 3
  },
  {
    id: '12',
    name: 'Producto 12',
    barcode: 'Q012',
    description: 'La descripcion',
    salePrice: 140,
    minimal: 30,
    stock: 3
  }
]

export default function ProductsSection() {
  const [productDelete] = useDeleteProductMutation()
  const { products, useInitProducts } = useProductsActions()
  console.log(products)
  // const TABLE_DATA = products.length !== 0 ? products : TABLE_ROWS
  const TABLE_DATA = TABLE_ROWS
  const { data: productsData, isLoading, isSuccess, isError, error } = useGetAllProductsQuery()

  useEffect(() => {
    if (isLoading) {
      console.log('Loading - Poner un espiner en la tabla')
    } else if (isSuccess) {
      useInitProducts(productsData)
    } else if (isError) {
      toast.error(`Error while conecting: ${error}`)
    }
  }, [])

  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_DATA.length).fill(false))
  const { useDeleteProductById } = useProductsActions()
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState(TABLE_DATA.slice())
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const selectedItems = checkedItems.filter((value) => value === true)

  const findSelectedProduct = () => {
    const index = checkedItems.findIndex((value) => value === true)
    return TABLE_DATA[index]
  }

  const getSelectedProducts = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? TABLE_DATA[index] : null))
      .filter(product => product !== null)
  }

  const handleDelete = async () => {
    const products = getSelectedProducts()
    if (products) {
      products.map(async (product) => {
        await productDelete(product.id).then((res) => {
          console.log(res)
          if (res.status === 201) {
            useDeleteProductById(product.id)
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
    const filteredProducts = TABLE_DATA.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.salePrice.toString().includes(searchTerm) ||
      product.minimal.toString().includes(searchTerm) ||
      product.stock.toString().includes(searchTerm)
    )
    setSearchFilter(filteredProducts)
  }

  const productToEdit = selectedItems.length === 1 && findSelectedProduct()

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
  const totalPages = Math.ceil(TABLE_DATA.length / productsPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <ProductsHeader onSearch={handleSearch} productToEdit={productToEdit} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <ProductsTable TABLE_DATA={visibleProducts} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} handleOpen={handleOpen} />
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

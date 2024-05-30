import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import PaginationGroup from '../pure/pagination/PaginationGroup.jsx'
import SimplePagination from '../pure/pagination/SimplePagination.jsx'
import ModalConfirmationDelete from '../pure/ModalConfirmationDelete.jsx'
import ProductsTable from './ProductsTable.jsx'
import ProductsHeader from './ProductsHeader.jsx'
import { useProductDeleteMutation } from '../../store/apiSlice.js'
import { useProductsActions } from '../../hooks/useProductsActions.js'

export default function ProductsSection() {
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
      head: 'Description',
      row: 'description'
    },
    {
      head: 'Quantity',
      row: 'stockMinimo'
    },
    {
      head: 'Supplier',
      row: 'supplier'
    },
    {
      head: 'Code',
      row: 'barCode'
    },
    {
      head: 'Sell Price',
      row: 'salePrice'
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
      description: 'La descripcion',
      supplier: 'Proveedor F',
      barCode: 'F006',
      salePrice: 180,
      stockMinimo: 15
    },
    {
      id: '2',
      name: 'Producto 2',
      description: 'La descripcion',
      supplier: 'Proveedor G',
      barCode: 'G007',
      salePrice: 220,
      stockMinimo: 8
    },
    {
      id: '3',
      name: 'Producto 3',
      description: 'La descripcion',
      supplier: 'Proveedor A',
      barCode: 'H008',
      salePrice: 120,
      stockMinimo: 25
    },
    {
      id: '4',
      name: 'Producto 4',
      description: 'La descripcion',
      supplier: 'Proveedor I',
      barCode: 'A009',
      salePrice: 350,
      stockMinimo: 3
    },
    {
      id: '5',
      name: 'Producto 5',
      description: 'La descripcion',
      supplier: 'Proveedor J',
      barCode: 'J010',
      salePrice: 280,
      stockMinimo: 18
    },
    {
      id: '6',
      name: 'Producto 6',
      description: 'Una descripcion',
      supplier: 'Proveedor K',
      barCode: 'K011',
      salePrice: 200,
      stockMinimo: 11
    },
    {
      id: '7',
      name: 'Producto 7',
      description: 'La descripcion',
      supplier: 'Proveedor L',
      barCode: 'L012',
      salePrice: 320,
      stockMinimo: 6
    },
    {
      id: '8',
      name: 'Producto 8',
      description: 'La descripcion',
      supplier: 'Proveedor M',
      barCode: 'M013',
      salePrice: 140,
      stockMinimo: 22
    },
    {
      id: '9',
      name: 'Producto 9',
      description: 'La descripcion',
      supplier: 'Proveedor N',
      barCode: 'N014',
      salePrice: 270,
      stockMinimo: 9
    },
    {
      id: '10',
      name: 'Producto 10',
      description: 'La descripcion',
      supplier: 'Proveedor O',
      barCode: 'O010',
      salePrice: 190,
      stockMinimo: 14
    },
    {
      id: '11',
      name: 'Producto 11',
      description: 'Una descripcion',
      supplier: 'Proveedor P',
      barCode: 'P011',
      salePrice: 320,
      stockMinimo: 6
    },
    {
      id: '12',
      name: 'Producto 12',
      description: 'La descripcion',
      supplier: 'Proveedor Q',
      barCode: 'Q012',
      salePrice: 140,
      stockMinimo: 22
    }
  ]

  const [productDelete] = useProductDeleteMutation()
  const { useDeleteProductById } = useProductsActions()
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))
  const selectedItems = checkedItems.filter((value) => value === true)

  const findSelectedProduct = () => {
    const index = checkedItems.findIndex((value) => value === true)
    return TABLE_ROWS[index]
  }

  const getSelectedProducts = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? TABLE_ROWS[index] : null))
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

  const productToEdit = selectedItems.length === 1 && findSelectedProduct()

  useEffect(() => {
    // Restablecer productos seleccionados al cambiar de página
    setCheckedItems(new Array(TABLE_ROWS.length).fill(false))
  }, [page])

  const productsPerPage = 7
  const startIndex = (page - 1) * productsPerPage
  const endIndex = Math.min(startIndex + productsPerPage, TABLE_ROWS.length)

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedRows = [...TABLE_ROWS].sort((a, b) => {
    if (!sortConfig) return TABLE_ROWS

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

  return (
    <>
      <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
        <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
          <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
            <ProductsHeader productToEdit={productToEdit} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
          </CardHeader>
          <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
            <ProductsTable TABLE_ROWS={visibleProducts} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} />
          </CardBody>
          <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
            <PaginationGroup page={page} setPage={setPage} totalItems={TABLE_ROWS.length} />
            <SimplePagination page={page} setPage={setPage} />
          </CardFooter>
        </Card>
        <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'products' : 'product'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
      </main>
    </>
  )
}

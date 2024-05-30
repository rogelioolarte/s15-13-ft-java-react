import { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import PaginationGroup from '../pure/pagination/PaginationGroup.jsx'
import SimplePagination from '../pure/pagination/SimplePagination.jsx'
import ModalConfirmationDelete from '../pure/ModalConfirmationDelete.jsx'
import ProductsTable from './ProductsTable.jsx'
import ProductsHeader from './ProductsHeader.jsx'
import { useProductDeleteMutation } from '../../store/apiSlice.js'
import { useProductsActions } from '../../hooks/useProductsActions.js'

export default function ProductsSection () {
  const TABLE_HEAD = ['checkbox', 'Product', 'Description', 'Quantity', 'Supplier', 'Code', 'Sell Price']

  const TABLE_ROWS = [
    {
      id: '1',
      name: 'Producto 6',
      description: 'La descripcion',
      supplier: 'Proveedor F',
      barCode: 'F006',
      precioVenta: '$180',
      stockMinimo: 15
    },
    {
      id: '2',
      name: 'Producto 7',
      description: 'La descripcion',
      supplier: 'Proveedor G',
      barCode: 'G007',
      precioVenta: '$220',
      stockMinimo: 8
    },
    {
      id: '3',
      name: 'Producto 8',
      description: 'La descripcion',
      supplier: 'Proveedor H',
      barCode: 'H008',
      precioVenta: '$120',
      stockMinimo: 25
    },
    {
      id: '4',
      name: 'Producto 9',
      description: 'La descripcion',
      supplier: 'Proveedor I',
      barCode: 'I009',
      precioVenta: '$350',
      stockMinimo: 3
    },
    {
      id: '5',
      name: 'Producto 10',
      description: 'La descripcion',
      supplier: 'Proveedor J',
      barCode: 'J010',
      precioVenta: '$280',
      stockMinimo: 18
    },
    {
      id: '6',
      name: 'Producto 11',
      description: 'La descripcion',
      supplier: 'Proveedor K',
      barCode: 'K011',
      precioVenta: '$200',
      stockMinimo: 11
    },
    {
      id: '7',
      name: 'Producto 12',
      description: 'La descripcion',
      supplier: 'Proveedor L',
      barCode: 'L012',
      precioVenta: '$320',
      stockMinimo: 6
    },
    {
      id: '8',
      name: 'Producto 13',
      description: 'La descripcion',
      supplier: 'Proveedor M',
      barCode: 'M013',
      precioVenta: '$140',
      stockMinimo: 22
    },
    {
      id: '9',
      name: 'Producto 14',
      description: 'La descripcion',
      supplier: 'Proveedor N',
      barCode: 'N014',
      precioVenta: '$270',
      stockMinimo: 9
    },
    {
      id: '10',
      name: 'Producto 15',
      description: 'La descripcion',
      supplier: 'Proveedor O',
      barCode: 'O015',
      precioVenta: '$190',
      stockMinimo: 14
    }
  ]

  const [productDelete] = useProductDeleteMutation()
  const { useDeleteProductById } = useProductsActions()

  const [active, setActive] = useState(1)
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

  console.log(productToEdit)

  return (
    <>
      <main className='w-full flex justify-center overflow-hidden px-6 py-4'>
        <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
          <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-5 m-0 mb-4'>
            <ProductsHeader productToEdit={productToEdit} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
          </CardHeader>
          <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
            <ProductsTable TABLE_ROWS={TABLE_ROWS} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
          </CardBody>
          <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
            <PaginationGroup active={active} setActive={setActive} />
            <SimplePagination active={active} setActive={setActive} />
          </CardFooter>
        </Card>
        <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'products' : 'product'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
      </main>
    </>
  )
}

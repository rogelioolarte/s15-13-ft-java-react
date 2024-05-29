import { Button, Typography } from '@material-tailwind/react'
import { ProductsTable } from './ProductsTable.jsx'
import { ProductsFormModal } from './ProductsFormModal.jsx'
import { useState } from 'react'
import { useProductDeleteMutation } from '../../store/apiSlice.js'
import { useProductsActions } from '../../hooks/useProductsActions.js'

export function ProductsSection () {
  const TABLE_HEAD = ['checkbox', 'Nombre', 'Descripcion', 'Cantidad', 'Proveedor', 'Codigo', 'Precio de Venta']

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

  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))
  const selectedItems = checkedItems.filter((value) => value === true)

  const findProduct = () => {
    const index = checkedItems.findIndex((value) => value === true)
    return TABLE_ROWS[index]
  }

  const handleDelete = async () => {
    const productId = findProduct().id
    if (productId) {
      await productDelete(productId).then((res) => {
        console.log(res)
        if (res.status === 201) {
          useDeleteProductById(productId)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const productToEdit = selectedItems.length === 1 && findProduct()

  console.log(productToEdit)

  return (
    <>
      <main className='text-center p-12 md:p-12 w-full flex flex-col items-center'>
        <Typography className='font-bold' variant='h1'>Products</Typography>
        <div className='gap-10 flex my-12'>
          <ProductsFormModal button={<Button className='bg-secondary-40 py-4 text-gray-900'>Add New</Button>} action='create' />
          <ProductsFormModal button={<Button disabled={selectedItems.length !== 1} className='bg-secondary-40 py-4 text-gray-900'>Modify</Button>} action='edit' productToEdit={productToEdit} />
          <Button disabled={selectedItems.length !== 1} onClick={handleDelete} className='bg-warning-40 py-4 text-gray-900'>Eliminar</Button>
        </div>
        <ProductsTable TABLE_ROWS={TABLE_ROWS} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
      </main>
    </>
  )
}

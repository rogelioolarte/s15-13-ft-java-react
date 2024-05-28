import { Button, Typography } from '@material-tailwind/react'
import { ProductsTable } from './ProductsTable.jsx'
import { ProductsFormModal } from './ProductsFormModal.jsx'
import { useState } from "react";
import { useProductDeleteMutation } from "../../store/apiSlice.js";
import { useProductsActions } from "../../hooks/useProductsActions.js";

export function ProductsSection () {
  const TABLE_HEAD = ['checkbox', 'Nombre', 'Descripcion', 'Cantidad', 'Proveedor', 'Codigo', 'Precio de Venta']

  const TABLE_ROWS = [
    {
      id: '1',
      name: 'Producto 6',
      description: 'La descripcion',
      cantidad: 15,
      proveedor: 'Proveedor F',
      codigo: 'F006',
      precioDeVenta: '$180'
    },
    {
      id: '2',
      name: 'Producto 7',
      description: 'La descripcion',
      cantidad: 8,
      proveedor: 'Proveedor G',
      codigo: 'G007',
      precioDeVenta: '$220'
    },
    {
      id: '3',
      name: 'Producto 8',
      description: 'La descripcion',
      cantidad: 25,
      proveedor: 'Proveedor H',
      codigo: 'H008',
      precioDeVenta: '$120'
    },
    {
      id: '4',
      name: 'Producto 9',
      description: 'La descripcion',
      cantidad: 3,
      proveedor: 'Proveedor I',
      codigo: 'I009',
      precioDeVenta: '$350'
    },
    {
      id: '5',
      name: 'Producto 10',
      description: 'La descripcion',
      cantidad: 18,
      proveedor: 'Proveedor J',
      codigo: 'J010',
      precioDeVenta: '$280'
    },
    {
      id: '6',
      name: 'Producto 11',
      description: 'La descripcion',
      cantidad: 11,
      proveedor: 'Proveedor K',
      codigo: 'K011',
      precioDeVenta: '$200'
    },
    {
      id: '7',
      name: 'Producto 12',
      description: 'La descripcion',
      cantidad: 6,
      proveedor: 'Proveedor L',
      codigo: 'L012',
      precioDeVenta: '$320'
    },
    {
      id: '8',
      name: 'Producto 13',
      description: 'La descripcion',
      cantidad: 22,
      proveedor: 'Proveedor M',
      codigo: 'M013',
      precioDeVenta: '$140'
    },
    {
      id: '9',
      name: 'Producto 14',
      description: 'La descripcion',
      cantidad: 9,
      proveedor: 'Proveedor N',
      codigo: 'N014',
      precioDeVenta: '$270'
    },
    {
      id: '10',
      name: 'Producto 15',
      description: 'La descripcion',
      cantidad: 14,
      proveedor: 'Proveedor O',
      codigo: 'O015',
      precioDeVenta: '$190'
    }
  ]

  const [productDelete] = useProductDeleteMutation();
  const { useDeleteProductById } = useProductsActions();

  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))
  const selectedItems = checkedItems.filter((value) => value === true)

  const findProduct = () => {
    const index = checkedItems.findIndex((value) => value === true);
    return TABLE_ROWS[index]
  }

  const handleDelete = async () => {
    const productId = findProduct().id;
    if (productId) {
      await productDelete(productId).then((res) => {console.log(res)
      if (res.status === 201) {
        useDeleteProductById(productId)
      }}).catch((error) => {
        console.log(error);
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
          <ProductsFormModal button={<Button className='bg-secondary-40 py-4 text-black'>Add New</Button>} action='create'/>
          <ProductsFormModal button={<Button disabled={selectedItems.length !== 1} className='bg-secondary-40 py-4 text-black'>Modify</Button>} action='edit' productToEdit={productToEdit}/>
          <Button disabled={selectedItems.length !== 1} onClick={handleDelete} className='bg-warning-40 py-4 text-black'>Eliminar</Button>
        </div>
        <ProductsTable TABLE_ROWS={TABLE_ROWS} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>
      </main>
    </>
  )
}
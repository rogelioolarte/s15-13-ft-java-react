import { Card, Typography } from '@material-tailwind/react'
import { useState } from 'react'
const TABLE_HEAD = ['checkbox', 'Producto', 'Descripcion', 'Cantidad', 'Proveedor', 'Codigo', 'Precio de Venta']

const TABLE_ROWS = [
  {
    producto: 'Producto 6',
    description: 'La descripcion',
    cantidad: 15,
    proveedor: 'Proveedor F',
    codigo: 'F006',
    precioDeVenta: '$180'
  },
  {
    producto: 'Producto 7',
    description: 'La descripcion',
    cantidad: 8,
    proveedor: 'Proveedor G',
    codigo: 'G007',
    precioDeVenta: '$220'
  },
  {
    producto: 'Producto 8',
    description: 'La descripcion',
    cantidad: 25,
    proveedor: 'Proveedor H',
    codigo: 'H008',
    precioDeVenta: '$120'
  },
  {
    producto: 'Producto 9',
    description: 'La descripcion',
    cantidad: 3,
    proveedor: 'Proveedor I',
    codigo: 'I009',
    precioDeVenta: '$350'
  },
  {
    producto: 'Producto 10',
    description: 'La descripcion',
    cantidad: 18,
    proveedor: 'Proveedor J',
    codigo: 'J010',
    precioDeVenta: '$280'
  },
  {
    producto: 'Producto 11',
    description: 'La descripcion',
    cantidad: 11,
    proveedor: 'Proveedor K',
    codigo: 'K011',
    precioDeVenta: '$200'
  },
  {
    producto: 'Producto 12',
    description: 'La descripcion',
    cantidad: 6,
    proveedor: 'Proveedor L',
    codigo: 'L012',
    precioDeVenta: '$320'
  },
  {
    producto: 'Producto 13',
    description: 'La descripcion',
    cantidad: 22,
    proveedor: 'Proveedor M',
    codigo: 'M013',
    precioDeVenta: '$140'
  },
  {
    producto: 'Producto 14',
    description: 'La descripcion',
    cantidad: 9,
    proveedor: 'Proveedor N',
    codigo: 'N014',
    precioDeVenta: '$270'
  },
  {
    producto: 'Producto 15',
    description: 'La descripcion',
    cantidad: 14,
    proveedor: 'Proveedor O',
    codigo: 'O015',
    precioDeVenta: '$190'
  }
]

export function ProductsTable () {
  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))

  const handleCheckAll = () => {
    const allChecked = checkedItems.every((item) => item)
    setCheckedItems(new Array(TABLE_ROWS.length).fill(!allChecked))
  }

  const handleCheckItem = (index) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
  }

  return (
    <Card className='h-full w-full lg:w-1/2 overflow-auto'>
      <table className='w-full min-w-max table-auto text-left'>
        <thead>
        <tr>
          {TABLE_HEAD.map((head, index) =>
            head === 'checkbox'
              ? (
                <th key={index} className='border-b border-blue-gray-100 bg-secondary-40 p-4'>
                  <input type='checkbox' onChange={handleCheckAll} checked={checkedItems.every((item) => item)} />
                </th>
              )
              : (
                <th key={index} className='border-b border-blue-gray-100 bg-secondary-40 p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                    {head}
                  </Typography>
                </th>
              )
          )}
        </tr>
        </thead>
        <tbody className='bg-primary-30'>
        {TABLE_ROWS.map(({ producto, description, cantidad, proveedor, codigo, precioDeVenta }, index) => (
            <tr key={codigo} className='even:bg-secondary-20'>
              <td className='p-4'>
                <input type='checkbox' checked={checkedItems[index]} onChange={() => handleCheckItem(index)}/>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {producto}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {description}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {cantidad}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {proveedor}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {codigo}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {precioDeVenta}
                </Typography>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </Card>
  )
}

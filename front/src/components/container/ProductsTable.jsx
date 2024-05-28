import { Card, Typography } from '@material-tailwind/react'
import { useState } from 'react'

export function ProductsTable ({TABLE_ROWS, TABLE_HEAD, checkedItems, setCheckedItems}) {
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
        {TABLE_ROWS.map(({ name, description, stockMinimo, supplier, barCode, precioVenta }, index) => (
            <tr key={barCode} className='even:bg-secondary-20'>
              <td className='p-4'>
                <input type='checkbox' checked={checkedItems[index]} onChange={() => handleCheckItem(index)}/>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {name}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {description}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {stockMinimo}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {supplier}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {barCode}
                </Typography>
              </td>
              <td className='p-4'>
                <Typography variant='small' color='blue-gray' className='font-normal'>
                  {precioVenta}
                </Typography>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </Card>
  )
}

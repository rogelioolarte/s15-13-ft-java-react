import { Checkbox, Typography } from '@material-tailwind/react'
import { LuChevronsUpDown } from 'react-icons/lu'
import MenuActionsTable from './MenuActionsTable'

export default function DynamicTable ({ TABLE_DATA, TABLE_HEAD, checkedItems, setCheckedItems, handleSort, typeModalView }) {
  const handleCheckAll = () => {
    const allChecked = checkedItems.every((item) => item)
    setCheckedItems(new Array(TABLE_DATA.length).fill(!allChecked))
  }

  const handleCheckItem = (index) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
  }

  const ColumnType = (column, item, index) => {
    switch (column.type) {
      case 'checkbox':
        return (
          <Checkbox
            id={item.id}
            ripple={false}
            className='hover:before:opacity-0'
            containerProps={{
              className: 'p-0'
            }}
            checked={checkedItems[index]}
            onChange={() => handleCheckItem(index)}
          />
        )
      case 'actions':
        return (<MenuActionsTable itemToEdit={item} type={typeModalView} />)
      case 'productList':
        return (
          <div>
            {item[column.key].length > 0
              ? (
                <div>
                  <Typography variant='small' className='font-normal'>
                    {`${item[column.key][0].name}x${item[column.key][0].quantity}`} {item[column.key].length > 1 ? '.....' : null}
                  </Typography>
                </div>
                )
              : (null)}
          </div>
        )
      case 'products':
        return (
          <div>
            {item[column.key].length > 0
              ? (
                <div>
                  <Typography variant='small' className='font-normal'>
                    {`${item[column.key][0].name}x${item[column.key][0].quantity}`} {item[column.key].length > 1 ? '.....' : null}
                  </Typography>
                </div>
                )
              : (null)}
          </div>
        )
      case 'date':
        return (
          <div>
            <Typography variant='small' className='font-normal'>{item[column.key].substring(0, 10)}</Typography>
          </div>
        )
      case 'supplierObject':
        return (
          <div>
            <Typography variant='small' className='font-normal'>{item[column.key].name}</Typography>
          </div>
        )
      case 'taxObject':
        return (
          <div>
            <Typography variant='small' className='font-normal'>{item[column.key].name} - {item[column.key].percentage}%</Typography>
          </div>
        )
      case 'customerObject':
        return (
          <div>
            <Typography variant='small' className='font-normal'>{item[column.key].name}</Typography>
          </div>
        )
      case 'percentage':
        return (
          <div>
            <Typography variant='small' className='font-normal'>{item[column.key]}%</Typography>
          </div>
        )
      case 'cash':
        return (
          <div>
            <Typography variant='small' className='font-normal'>
              {(typeof item[column.key] === 'number')
                ? '$' + Math.abs(item[column.key]).toFixed(2)
                : item[column.key]}
            </Typography>
          </div>
        )
      default:
        return (
          <Typography variant='small' className='font-normal'>
            {item[column.key]}
          </Typography>
        )
    }
  }

  return (
    <table className='w-full min-w-max table-auto text-left'>
      <thead>
        <tr>
          {TABLE_HEAD.map((column, index) => (
            <th
              key={index}
              className='first:flex items-center h-12 first:cursor-default last:cursor-default cursor-pointer bg-[#F1F3F9] p-4 transition-colors hover:bg-[#e4e7ee] first:hover:bg-[#F1F3F9] last:hover:bg-[#F1F3F9]'
              onClick={() => column.sortable && handleSort(column.key)}
            >
              {column.type === 'checkbox'
                ? (
                  <Checkbox
                    ripple={false}
                    className='hover:before:opacity-0'
                    containerProps={{
                      className: 'p-0'
                    }}
                    checked={checkedItems.every((item) => item)}
                    onChange={handleCheckAll}
                  />
                  )
                : (
                  <Typography
                    variant='small'
                    className='flex text-[#1D2433] font-semibold items-center gap-2 leading-none'
                  >
                    {column.label}{' '}
                    {column.sortable && <LuChevronsUpDown strokeWidth={2} className='h-3 w-4' />}
                  </Typography>
                  )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TABLE_DATA.map((item, index) => {
          const classes = 'first:flex items-center h-12 px-4 text-[#1D2433]'
          return (
            <tr key={index} className={`even:bg-[#F8F9FC] odd:bg-white ${(typeModalView !== 'Sale' || typeModalView !== 'Purchase') && item.active === false ? 'opacity-50' : ''}`}>
              {TABLE_HEAD.map((column, colIndex) => (
                <td key={colIndex} className={classes}>
                  {ColumnType(column, item, index)}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

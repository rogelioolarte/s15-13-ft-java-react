import MenuActionsTable from '../pure/MenuActionsTable'
import { Card, Checkbox, Typography } from '@material-tailwind/react'
import { LuChevronsUpDown } from 'react-icons/lu'

export function SuppliersTable ({ TABLE_ROWS, TABLE_HEAD, checkedItems, setCheckedItems }) {
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
                  <th
                    key={head}
                    className='first:w-8 last:w-8 first:cursor-default last:cursor-default cursor-pointer bg-[#F1F3F9] p-4 transition-colors hover:bg-[#e4e7ee] first:hover:bg-[#F1F3F9] last:hover:bg-[#F1F3F9]'
                  >
                    <Typography
                      variant='small'
                      className='flex text-[#1D2433] font-semibold items-center gap-2 leading-none'
                    >
                      {head}{' '}
                      {(index !== 0 && index !== TABLE_HEAD.length - 1) && (
                        <LuChevronsUpDown strokeWidth={2} className='h-3 w-4' />
                      )}
                    </Typography>
                  </th>
                  )
            )}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            ({ id, name, cuit }, index) => {
              const classes = 'px-4 text-[#1D2433]'
              return (
                <tr key={id} className='even:bg-[#F8F9FC] odd:bg-white'>
                  {/* <td className='p-4'>
                    <input type='checkbox' checked={checkedItems[index]} onChange={() => handleCheckItem(index)} />
                  </td> */}
                  {/* checked */}
                  <td className={classes}>
                    <div className='flex items-center gap-3'>
                      <div className='flex flex-col'>
                        <Checkbox
                          id={id}
                          ripple={false}
                          className='hover:before:opacity-0'
                          containerProps={{
                            className: 'p-0'
                          }}
                          checked={checkedItems[index]}
                          onChange={() => handleCheckItem(index)}
                        />
                      </div>
                    </div>
                  </td>
                  {/* name */}
                  <td className={classes}>
                    <div className='flex items-center gap-3'>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          className='font-normal'
                        >
                          {name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  {/* cuit */}
                  <td className={classes}>
                    <Typography
                      variant='small'
                      className='font-normal'
                    >
                      {cuit}
                    </Typography>
                  </td>
                  {/* actions */}
                  <td className={classes + ' text-center'}>
                    <MenuActionsTable />
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </Card>
  )
}

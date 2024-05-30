import MenuActionsTable from '../pure/MenuActionsTable'
import { Checkbox, Typography } from '@material-tailwind/react'
import { LuChevronsUpDown } from 'react-icons/lu'

export default function SuppliersTable ({ TABLE_ROWS, TABLE_HEAD, checkedItems, setCheckedItems }) {
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
    <table className='w-full min-w-max table-auto text-left'>
      <thead>
        <tr>
          {TABLE_HEAD.map((head, index) =>
            <th
              key={head}
              className='first:flex items-center last:w-10 h-12 first:cursor-default last:cursor-default cursor-pointer bg-[#F1F3F9] p-4 transition-colors hover:bg-[#e4e7ee] first:hover:bg-[#F1F3F9] last:hover:bg-[#F1F3F9]'
            >
              {head === 'checkbox'
                ? (
                  <Checkbox
                    ripple={false}
                    className='hover:before:opacity-0'
                    containerProps={{
                      className: 'p-0'
                    }}
                    checked={checkedItems.every((item) => item)}
                    onChange={handleCheckAll}
                  />)
                : (
                  <Typography
                    variant='small'
                    className='flex text-[#1D2433] font-semibold items-center gap-2 leading-none'
                  >
                    {head}{' '}
                    {(index !== 0 && index !== TABLE_HEAD.length - 1) && (
                      <LuChevronsUpDown strokeWidth={2} className='h-3 w-4' />
                    )}
                  </Typography>)}
            </th>)}
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS.map(
          ({ id, name, cuit }, index) => {
            const classes = 'px-4 py-1 text-[#1D2433]'
            return (
              <tr key={id} className='even:bg-[#F8F9FC] odd:bg-white'>
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
  )
}

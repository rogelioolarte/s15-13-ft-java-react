import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react'
import { CustomersFormModal } from '../container/customers/CustomersFormModal'

export default function MenuActionsTableB ({ handleOpen, customerToEdit }) {
  return (
    <Menu
      placement='left'
      animate={{
        mount: { x: 0 },
        unmount: { x: 25 }
      }}
    >
      <MenuHandler>
        <IconButton
          className='h-5 rounded bg-transparent shadow-none text-gray-900 text-lg hover:shadow-none hover:text-gray-800 transition-colors duration-300 ease-in-out'
          onClick={() => handleOpen()}
        >
          <HiOutlineDotsVertical />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem>See More</MenuItem>
        <MenuItem>
          <CustomersFormModal
            button={
              <p
                className='min-w-fit flex-1 shadow-none hover:shadow-none hover:bg-secondary-60 transition-all duration-300 ease-in-out'
              >Modify
              </p>
            }
            action='edit'
            customerToEdit={customerToEdit}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

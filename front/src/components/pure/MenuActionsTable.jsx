import { HiOutlineDotsVertical } from 'react-icons/hi'
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react'

export default function MenuActionsTable () {
  return (
    <Menu
      placement='left'
      animate={{
        mount: { x: 0 },
        unmount: { x: 25 }
      }}
    >
      <MenuHandler>
        <IconButton className='rounded bg-transparent shadow-none text-gray-900 text-lg hover:shadow-none hover:text-gray-800 transition-colors duration-300 ease-in-out'>
          <HiOutlineDotsVertical />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem>New</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Modify</MenuItem>
      </MenuList>
    </Menu>
  )
}

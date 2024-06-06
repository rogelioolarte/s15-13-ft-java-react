import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react'
import SuppliersFormModal from '../container/suppliers/SuppliersFormModal'
import ModalViewItem from './ModalViewItem'

export default function MenuActionsTable ({ supplierToEdit }) {
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = () => { setOpenMenu(!openMenu) }

  return (
    <Menu
      open={openMenu}
      handler={handleOpenMenu}
      placement='left'
      animate={{
        mount: { x: 0 },
        unmount: { x: 25 }
      }}
    >
      <MenuHandler>
        <IconButton
          className='h-5 rounded bg-transparent shadow-none text-gray-900 text-lg hover:shadow-none hover:text-gray-800 transition-colors duration-300 ease-in-out'
        >
          <HiOutlineDotsVertical />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <SuppliersFormModal button={<MenuItem>Modify</MenuItem>} action='edit' supplierToEdit={supplierToEdit} setOpenMenu={setOpenMenu} />
        <ModalViewItem button={<MenuItem>See More</MenuItem>} supplierToEdit={supplierToEdit} setOpenMenu={setOpenMenu} />
      </MenuList>
    </Menu>
  )
}

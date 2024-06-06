import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react'
import ProductsFormModal from './ProductsFormModal'
import ModalViewItemProduct from './ModalViewProduct'

export default function MenuActionsTableProducts ({ productToEdit }) {
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
        <ProductsFormModal button={<MenuItem>Modify</MenuItem>} action='edit' productToEdit={productToEdit} setOpenMenu={setOpenMenu} />
        <ModalViewItemProduct button={<MenuItem>See More</MenuItem>} productToEdit={productToEdit} setOpenMenu={setOpenMenu} />
      </MenuList>
    </Menu>
  )
}

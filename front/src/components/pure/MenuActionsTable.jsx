import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react'
import FormModal from './FormModal'
import SuppliersModalViewItem from '../container/suppliers/SuppliersModalViewItem'
import CustomersModalViewItem from '../container/customers/CustomersModalViewItem'
import ProductsModalViewItem from '../container/products/ProductsModalViewItem'
import TaxesModalViewItem from '../container/taxes/TaxesModalViewItem'
import SalesModalViewItem from '../container/sales/SalesModalViewItem'
import PurchasesModalViewItem from '../container/purchases/PurchasesModalViewItem'

export default function MenuActionsTable ({ itemToEdit, type }) {
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = () => { setOpenMenu(!openMenu) }

  const ModalView = () => {
    switch (type) {
      case 'Supplier':
        return <SuppliersModalViewItem button={<MenuItem>See More</MenuItem>} itemToEdit={itemToEdit} setOpenMenu={setOpenMenu} />
      case 'Customer':
        return <CustomersModalViewItem button={<MenuItem>See More</MenuItem>} itemToEdit={itemToEdit} setOpenMenu={setOpenMenu} />
      case 'Product':
        return <ProductsModalViewItem button={<MenuItem>See More</MenuItem>} itemToEdit={itemToEdit} setOpenMenu={setOpenMenu} />
      case 'Tax':
        return <TaxesModalViewItem button={<MenuItem>See More</MenuItem>} itemToEdit={itemToEdit} setOpenMenu={setOpenMenu} />
      case 'Sale':
        return <SalesModalViewItem button={<MenuItem>See More</MenuItem>} itemToEdit={itemToEdit} setOpenMenu={setOpenMenu} />
      case 'Purchase':
        return <PurchasesModalViewItem button={<MenuItem>See More</MenuItem>} itemToEdit={itemToEdit} setOpenMenu={setOpenMenu} />
      default:
        return null
    }
  }

  const ModifyOption = () => {
    switch (type) {
      case 'Sale':
        return null
      case 'Purchase':
        return null
      default:
        return (<FormModal button={<MenuItem>Modify</MenuItem>} action='edit' itemToEdit={itemToEdit} setOpenMenu={setOpenMenu} formType={type} />)
    }
  }

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
        {ModifyOption()}
        {ModalView()}
      </MenuList>
    </Menu>
  )
}

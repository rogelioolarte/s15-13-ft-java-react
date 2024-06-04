import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup'
import SimplePagination from '../../pure/pagination/SimplePagination'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete'
import SuppliersTable from './SuppliersTable'
import SuppliersHeader from './SuppliersHeader'
import { useSuppliersActions } from '../../../hooks/useSuppliersActions.js'
import { useGetAllSuppliersQuery, useDeleteSupplierMutation } from '../../../store/apiSlice.js'

const TABLE_HEAD = [
  {
    head: 'checkbox',
    row: 'checkbox'
  },
  {
    head: 'Supplier Name',
    row: 'name'
  },
  {
    head: 'Company Code N°',
    row: 'companyCode'
  },
  {
    head: '',
    row: 'actions'
  }
]
const TABLE_ROWS = [
  {
    id: '11111',
    name: 'AText',
    companyCode: '123123'
  },
  {
    id: '22222',
    name: 'BText',
    companyCode: '456456'
  },
  {
    id: '33333',
    name: 'CText',
    companyCode: '888888'
  },
  {
    id: '44444',
    name: 'DText',
    companyCode: '444444'
  },
  {
    id: '55555',
    name: 'EText',
    companyCode: '666666'
  },
  {
    id: '6',
    name: 'FText',
    companyCode: '555555'
  },
  {
    id: '7',
    name: 'GText',
    companyCode: '777777'
  }
]

export default function SuppliersSection () {
  const [deleteSupplier] = useDeleteSupplierMutation()
  const { suppliers, useInitSuppliers } = useSuppliersActions()
  // console.log(suppliers)
  const TABLE_DATA = suppliers.length !== 0 ? suppliers : TABLE_ROWS
  const { data: suppliersData, isLoading, isSuccess, isError, error } = useGetAllSuppliersQuery()

  useEffect(() => {
    if (isLoading) {
      console.log('Loading - Poner un espiner en la tabla')
    } else if (isSuccess) {
      useInitSuppliers(suppliersData)
    } else if (isError) {
      toast.error(`Error while conecting: ${error}`)
    }
  }, [])

  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))
  const { useDeleteSupplierById } = useSuppliersActions()
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState(TABLE_DATA.slice())
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const selectedItems = checkedItems.filter((value) => value === true)

  const findSelectedSupplier = () => {
    const index = checkedItems.findIndex((value) => value === true)
    return TABLE_DATA[index]
  }

  const getSelectedSuppliers = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? TABLE_DATA[index] : null))
      .filter(supplier => supplier !== null)
  }

  const handleDelete = async () => {
    const suppliers = getSelectedSuppliers()
    if (suppliers) {
      suppliers.map(async (supplier) => {
        await deleteSupplier(supplier.id).then((res) => {
          console.log(res)
          if (res.status === 201) {
            useDeleteSupplierById(supplier.id)
            setIsDeleteConfirmationOpen(false)
          }
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  }

  const handleOpen = () => setOpen(!open)

  const handleSearch = (searchTerm) => {
    const filteredSuppliers = TABLE_DATA.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.companyCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredSuppliers)
  }

  const supplierToEdit = selectedItems.length === 1 && findSelectedSupplier()

  useEffect(() => {
    // Restablecer suppliers seleccionados al cambiar de página
    setCheckedItems(new Array(TABLE_DATA.length).fill(false))
  }, [page])

  const suppliersPerPage = 7
  const startIndex = (page - 1) * suppliersPerPage
  const endIndex = Math.min(startIndex + suppliersPerPage, TABLE_DATA.length)

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedRows = [...searchFilter].sort((a, b) => {
    if (!sortConfig) return TABLE_DATA

    const { key, direction } = sortConfig

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      // Orden alfabético
      return direction === 'ascending' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
    } else {
      // Orden numérico
      return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key]
    }
  })

  const visibleSuppliers = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(TABLE_DATA.length / suppliersPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <SuppliersHeader onSearch={handleSearch} supplierToEdit={supplierToEdit} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <SuppliersTable TABLE_DATA={visibleSuppliers} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} handleOpen={handleOpen} />
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'suppliers' : 'supplier'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
    </main>
  )
}

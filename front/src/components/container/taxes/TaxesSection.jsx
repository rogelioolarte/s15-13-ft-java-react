import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react'
import PaginationGroup from '../../pure/pagination/PaginationGroup.jsx'
import SimplePagination from '../../pure/pagination/SimplePagination.jsx'
import ModalConfirmationDelete from '../../pure/ModalConfirmationDelete.jsx'
import TaxesTable from './TaxesTable.jsx'
import TaxesHeader from './TaxesHeader.jsx'
import { useTaxesActions } from '../../../hooks/useTaxesActions.js'
import { useGetAllTaxesQuery, useDeleteTaxMutation } from '../../../store/apiSlice.js'

const TABLE_HEAD = [
  {
    head: 'checkbox',
    row: 'checkbox'
  },
  {
    head: 'Taxes Name',
    row: 'name'
  },
  {
    head: 'Percentage',
    row: 'percentage'
  },
  {
    head: '',
    row: 'actions'
  }
]
const TABLE_ROWS = [
  {
    id: '1',
    name: 'AATaxe',
    percentage: '12'
  },
  {
    id: '2',
    name: 'BETaxe',
    percentage: '45'
  },
  {
    id: '3',
    name: 'CATaxe',
    percentage: '88'
  },
  {
    id: '4',
    name: 'DETaxe',
    percentage: '44'
  },
  {
    id: '5',
    name: 'EFTaxe',
    percentage: '66'
  },
  {
    id: '6',
    name: 'FFTaxe',
    percentage: '55'
  },
  {
    id: '7',
    name: 'GOTaxe',
    percentage: '47'
  },
  {
    id: '8',
    name: 'HETaxe',
    percentage: '45'
  },
  {
    id: '9',
    name: 'IATaxe',
    percentage: '88'
  },
  {
    id: '10',
    name: 'JETaxe',
    percentage: '44'
  },
  {
    id: '11',
    name: 'KFTaxe',
    percentage: '67'
  },
  {
    id: '12',
    name: 'LFTaxe',
    percentage: '75'
  },
  {
    id: '13',
    name: 'MTaxe',
    percentage: '47'
  },
  {
    id: '14',
    name: 'NOTaxe',
    percentage: '99'
  }
]

export default function TaxesSection () {
  const [taxeDelete] = useDeleteTaxMutation()
  const { taxes, useInitTaxes } = useTaxesActions()
  const TABLE_DATA = taxes.length !== 0 ? taxes : TABLE_ROWS
  const { data: taxesData, isLoading, isSuccess, isError, error } = useGetAllTaxesQuery()

  useEffect(() => {
    if (isLoading) {
      console.log('Loading - Poner un espiner en la tabla')
    } else if (isSuccess) {
      useInitTaxes(taxesData)
    } else if (isError) {
      toast.error(`Error while conecting: ${error}`)
    }
  }, [])

  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_ROWS.length).fill(false))
  const { useDeleteTaxeById } = useTaxesActions()
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState(TABLE_DATA.slice())
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const selectedItems = checkedItems.filter((value) => value === true)

  const findSelectedTaxe = () => {
    const index = checkedItems.findIndex((value) => value === true)
    return TABLE_DATA[index]
  }

  const getSelectedtaxes = () => {
    return checkedItems
      .map((isChecked, index) => (isChecked ? TABLE_DATA[index] : null))
      .filter(taxes => taxes !== null)
  }

  const handleDelete = async () => {
    const taxes = getSelectedtaxes()
    if (taxes) {
      taxes.map(async (taxe) => {
        await taxeDelete(taxe.id).then((res) => {
          console.log(res)
          if (res.status === 201) {
            useDeleteTaxeById(taxe.id)
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
    const filteredtaxes = TABLE_DATA.filter(taxe =>
      taxe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      taxe.percentage.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchFilter(filteredtaxes)
  }

  const taxeToEdit = selectedItems.length === 1 && findSelectedTaxe()

  useEffect(() => {
    // Restablecer taxes seleccionados al cambiar de página
    setCheckedItems(new Array(TABLE_DATA.length).fill(false))
  }, [page])

  const taxesPerPage = 7
  const startIndex = (page - 1) * taxesPerPage
  const endIndex = Math.min(startIndex + taxesPerPage, TABLE_DATA.length)

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

  const visibletaxes = sortedRows.slice(startIndex, endIndex)
  const totalPages = Math.ceil(TABLE_DATA.length / taxesPerPage)

  return (
    <main className='w-full flex justify-center overflow-hidden px-6 py-5'>
      <Card className='h-full w-full max-w-screen-xl rounded-none bg-transparent shadow-none'>
        <CardHeader floated={false} shadow={false} className='rounded-none bg-transparent flex flex-col gap-4 m-0 mb-4'>
          <TaxesHeader onSearch={handleSearch} taxeToEdit={taxeToEdit} selectedItems={selectedItems} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} />
        </CardHeader>
        <CardBody className='tableBody overflow-x-scroll p-0 shadow-lg rounded-t-lg'>
          <TaxesTable TABLE_DATA={visibletaxes} TABLE_HEAD={TABLE_HEAD} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleSort={handleSort} handleOpen={handleOpen} />
        </CardBody>
        <CardFooter className='flex items-center bg-[#F1F3F9] rounded-b-lg justify-center sm:justify-between px-4 py-2'>
          <PaginationGroup page={page} setPage={setPage} totalPages={totalPages} />
          <SimplePagination page={page} setPage={setPage} totalPages={totalPages} />
        </CardFooter>
      </Card>
      <ModalConfirmationDelete message={`You are about to delete ${selectedItems.length} ${selectedItems.length > 1 ? 'taxes' : 'taxe'}`} callback={handleDelete} open={isDeleteConfirmationOpen} handleOpen={() => setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)} />
    </main>
  )
}

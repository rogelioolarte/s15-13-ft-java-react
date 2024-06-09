import { useState } from 'react'
import { Input } from '@material-tailwind/react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

export default function SearchTables ({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <Input
      id='search-input'
      name='search'
      className='bg-white'
      label='Search'
      icon={<FaMagnifyingGlass className='h-5 w-5' />}
      value={searchTerm}
      onChange={handleChange}
    />
  )
}

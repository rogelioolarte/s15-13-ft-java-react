import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './index.css'
import Navbar from './components/container/Navbar'
import Sidebar from './components/container/Sidebar'
import { Toaster } from 'sonner'

export default function App () {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className='flex relative'>
      <Sidebar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Outlet />
      <Toaster />
    </div>
  )
}

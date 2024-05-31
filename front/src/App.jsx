import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './index.css'
import Navbar from './components/container/Navbar'
import Sidebar from './components/container/Sidebar'

export default function App () {
  const [openSidebar, setOpenSidebar] = useState(true)

  return (
    <div className='flex'>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Outlet />
    </div>
  )
}

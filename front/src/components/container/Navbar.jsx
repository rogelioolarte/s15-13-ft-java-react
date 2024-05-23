import { TfiMenu } from 'react-icons/tfi'
import { MdOutlineClose } from 'react-icons/md'

export default function Navbar ({ openSidebar, setOpenSidebar }) {
  const handleSidebarToggle = () => {
    setOpenSidebar((prev) => !prev)
  }
  return (
    <nav className='flex justify-center p-2 w-14 min-h-screen bg-[#D9D9D9]'>
      <button
        aria-label='Toggle Menu'
        className='p-1 flex justify-center items-center w-8 h-8 bg-transparent rounded-md hover:bg-white/35 transition-all duration-300 ease-in-out'
        onClick={() => handleSidebarToggle()}
      >
        {openSidebar
          ? <MdOutlineClose fill='#111827' size={26} />
          : <TfiMenu fill='#111827' size={26} />}
      </button>
    </nav>
  )
}

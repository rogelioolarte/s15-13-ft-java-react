import HomeSection from '../components/container/HomeSection'
import NavBarHome from '../components/pure/NavBarHome'

export default function HomePage () {
  return (
    <div className='flex flex-col w-full h-[100vh]'>
      <NavBarHome />
      <HomeSection />
    </div>
  )
}

import DashboardSection from '../components/container/DashboardSection'
import useProtectedRoutes from '../hooks/useProtectedRoutes'

export default function DashboardPage () {
  /* useProtectedRoutes() */

  return (
    <div className='flex h-[100vh] w-full'>
      <DashboardSection />
    </div>
  )
}

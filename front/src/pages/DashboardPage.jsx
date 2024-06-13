import DashboardSection from '../components/container/DashboardSection'
import useProtectedRoutes from '../hooks/useProtectedRoutes'

export default function DashboardPage () {
  useProtectedRoutes()

  return (
    <div className='flex min-h-[100vh] h-full w-full'>
      <DashboardSection />
    </div>
  )
}

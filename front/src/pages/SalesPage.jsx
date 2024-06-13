import SalesSection from '../components/container/sales/SalesSection'
import useProtectedRoutes from '../hooks/useProtectedRoutes'

export default function SalesPage () {
  useProtectedRoutes()

  return (
    <SalesSection />
  )
}

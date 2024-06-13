import useProtectedRoutes from '../hooks/useProtectedRoutes'
import SuppliersSection from '../components/container/suppliers/SuppliersSection'

export default function SuppliersPage () {
  useProtectedRoutes()

  return (
    <SuppliersSection />
  )
}

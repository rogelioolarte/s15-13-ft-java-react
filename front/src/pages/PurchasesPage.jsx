import PurchasesSection from '../components/container/purchases/PurchasesSection'
import useProtectedRoutes from '../hooks/useProtectedRoutes'

export default function PurchasesPage () {
  useProtectedRoutes()

  return (
    <PurchasesSection />
  )
}

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initPurchases } from '../store/purchasesSlice'
import { usePurchasesMutation } from '../store/apiSlice'
import PurchasesSection from '../components/container/PurchasesSection'
// import useProtectedRoutes from '../hooks/useProtectedRoutes'

export const useAppSelector = useSelector
export const useAppDispatch = useDispatch
export default function PurchasesPage () {
  /* useProtectedRoutes() */
  const dispatch = useAppDispatch()
  const purchases = useAppSelector(state => state.purchases)

  // Utiliza la mutación para obtener las compras desde la API
  const [getPurchases] = usePurchasesMutation()

  // Al montar el componente, obtén las compras desde la API
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Realiza la llamada a la API para obtener las compras
        const result = await getPurchases()
        // Inicializa el estado de las compras en el store de Redux con los datos obtenidos
        // useInitPurchases(result)
        console.log(result)
        dispatch(initPurchases(result.data))
      } catch (error) {
        // Maneja cualquier error que ocurra durante la llamada a la API
        console.error('Error fetching purchases:', error)
      }
    }

    // Llama a la función para obtener las compras
    fetchPurchases()
  }, [dispatch, getPurchases])

  return (
    <PurchasesSection purchases={purchases} />
  )
}

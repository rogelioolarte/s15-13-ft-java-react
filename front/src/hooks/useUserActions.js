import { useAppDispatch, useAppSelector } from './store'
import { resetUser, setUser } from '../store/userSlice'
import { resetSales } from '../store/salesSlice'
import { resetTaxes } from '../store/taxesSlice'
import { resetSuppliers } from '../store/suppliersSlice'
import { resetPurchases } from '../store/purchasesSlice'
import { resetProducts } from '../store/productsSlice'
import { resetCustomers } from '../store/customersSlice'

export const useUserActions = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  /**
   * This method check a real User in the Context
   */
  const useCheckRealUser = (user) => {
    return (user.id && user.first_name && user.last_name && user.email)
  }

  /**
   * This method reset the Context
   */
  const useResetUser = () => {
    dispatch(resetUser())
    dispatch(resetSales())
    dispatch(resetTaxes())
    dispatch(resetSuppliers())
    dispatch(resetPurchases())
    dispatch(resetProducts())
    dispatch(resetCustomers())
  }

  /**
   * This method set a User in the Context
   * @param {*} data This parameter required a User
   */
  const useSetUser = (data) => {
    dispatch(setUser(data))
  }

  return { useCheckRealUser, useResetUser, useSetUser, user }
}

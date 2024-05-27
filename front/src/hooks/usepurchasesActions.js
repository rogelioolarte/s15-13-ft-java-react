import {
  initPurchases,
  addPurchase,
  updatePurchaseById,
  deletePurchaseById,
  resetPurchases
} from '../store/purchasesSlice'
import { useAppDispatch, useAppSelector } from './store'

export const useCustomersActions = () => {
  const purchases = useAppSelector(state => state.purchases)
  const dispatch = useAppDispatch()

  /**
   * This method add a List of Purchases
   * @param {[]} data This parameter required a array of Purchases
   */
  const useInitPurchases = (data) => {
    dispatch(initPurchases(data))
  }

  /**
   * This method add a Purchase
   * @param {object} data This parameter required a Purchase Object
   */
  const useAddPurchase = (data) => {
    dispatch(addPurchase(data))
  }

  /**
   * This method update a Purchase by Id
   * @param {object} param This parameter requiered an object with id and newData
   */
  const useUpdatePurchaseById = ({ id, newData }) => {
    dispatch(updatePurchaseById({ id, newData }))
  }

  /**
   * This method delete a Purchase by Id
   * @param {number} id This parameter required a Id
   */
  const useDeletePurchaseById = (id) => {
    dispatch(deletePurchaseById(id))
  }

  /**
   * This method reset the List of Purchases
   */
  const useResetPurchases = () => {
    dispatch(resetPurchases())
  }

  return {
    useInitPurchases,
    useAddPurchase,
    useUpdatePurchaseById,
    useDeletePurchaseById,
    useResetPurchases,
    purchases
  }
}

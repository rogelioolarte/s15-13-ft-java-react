import {
  initTaxes,
  addTax,
  updateTaxById,
  deleteTaxById,
  resetTaxes
} from '../store/taxesSlice'
import { useAppDispatch, useAppSelector } from './store'

export const useTaxesActions = () => {
  const taxes = useAppSelector(state => state.taxes)
  const dispatch = useAppDispatch()

  /**
   * This method add a List of Taxes
   * @param {[]} data This parameter required a array of Taxes
   */
  const useInitTaxes = (data) => {
    dispatch(initTaxes(data))
  }

  /**
   * This method add a Tax
   * @param {object} data This parameter required a Tax Object
   */
  const useAddTax = (data) => {
    dispatch(addTax(data))
  }

  /**
   * This method update a Tax by Id
   * @param {object} param This parameter requiered an object with id and newData
   */
  const useUpdateTaxById = ({ id, newData }) => {
    dispatch(updateTaxById({ id, newData }))
  }

  /**
   * This method delete a Tax by Id
   * @param {number} id This parameter required a Id
   */
  const useDeleteTaxById = (id) => {
    dispatch(deleteTaxById(id))
  }

  /**
   * This method reset the List of Taxes
   */
  const useResetTaxes = () => {
    dispatch(resetTaxes())
  }

  return {
    useInitTaxes,
    useAddTax,
    useUpdateTaxById,
    useDeleteTaxById,
    useResetTaxes,
    taxes
  }
}

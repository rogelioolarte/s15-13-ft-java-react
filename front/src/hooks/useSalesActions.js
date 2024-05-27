import { addSale, updateSaleById, deleteSaleById, initSales, resetSales } from '../store/salesSlice'
import { useAppDispatch, useAppSelector } from './store'

export const useSalesActions = () => {
  const sales = useAppSelector(state => state.sales)
  const dispatch = useAppDispatch()

  /**
   * This method add a List of Sales
   * @param {[]} data This parameter required a array of Sales
   */
  const useInitSales = (data) => {
    dispatch(initSales(data))
  }

  /**
   * This method add a Sale
   * @param {object} data This parameter required a Sale Object
   */
  const useAddSale = (data) => {
    dispatch(addSale(data))
  }

  /**
   * This method update a Sale by Id
   * @param {object} param This parameter requiered an object with id and newData
   */
  const useUpdateSaleById = ({ id, newData }) => {
    dispatch(updateSaleById({ id, newData }))
  }

  /**
   * This method delete a Sale by Id
   * @param {number} id This parameter required a Id
   */
  const useDeleteSaleById = (id) => {
    dispatch(deleteSaleById(id))
  }

  /**
   * This method reset the List of Sales
   */
  const useResetSales = () => {
    dispatch(resetSales())
  }

  return { useInitSales, useAddSale, useUpdateSaleById, useDeleteSaleById, useResetSales, sales }
}

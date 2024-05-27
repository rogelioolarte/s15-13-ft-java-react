import {
  initSuppliers,
  addSupplier,
  updateSupplierById,
  deleteSupplierById,
  resetSuppliers
} from '../store/suppliersSlice'
import { useAppDispatch, useAppSelector } from './store'

export const useCustomersActions = () => {
  const suppliers = useAppSelector(state => state.suppliers)
  const dispatch = useAppDispatch()

  /**
   * This method add a List of Suppliers
   * @param {[]} data This parameter required a array of Suppliers
   */
  const useInitSuppliers = (data) => {
    dispatch(initSuppliers(data))
  }

  /**
   * This method add a Supplier
   * @param {object} data This parameter required a Supplier Object
   */
  const useAddSupplier = (data) => {
    dispatch(addSupplier(data))
  }

  /**
   * This method update a Supplier by Id
   * @param {object} param This parameter requiered an object with id and newData
   */
  const useUpdateSupplierById = ({ id, newData }) => {
    dispatch(updateSupplierById({ id, newData }))
  }

  /**
   * This method delete a Supplier by Id
   * @param {number} id This parameter required a Id
   */
  const useDeleteSupplierById = (id) => {
    dispatch(deleteSupplierById(id))
  }

  /**
   * This method reset the List of Suppliers
   */
  const useResetSuppliers = () => {
    dispatch(resetSuppliers())
  }

  return {
    useInitSuppliers,
    useAddSupplier,
    useUpdateSupplierById,
    useDeleteSupplierById,
    useResetSuppliers,
    suppliers
  }
}

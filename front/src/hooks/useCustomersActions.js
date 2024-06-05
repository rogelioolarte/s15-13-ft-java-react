import {
  initCustomers,
  addCustomer,
  updateCustomerById,
  deleteCustomerById,
  resetCustomers
} from '../store/customersSlice'
import { useAppDispatch, useAppSelector } from './store'

export const useCustomersActions = () => {
  const customers = useAppSelector(state => state.customers)
  const dispatch = useAppDispatch()

  /**
   * This method add a List of Customers
   * @param {[]} data This parameter required an array of Customers
   */
  const useInitCustomers = (data) => {
    dispatch(initCustomers(data))
  }

  /**
   * This method add a Customer
   * @param {object} data This parameter required a Customer Object
   */
  const useAddCustomer = (data) => {
    dispatch(addCustomer(data))
  }

  /**
   * This method update a Customer by Id
   * @param {object} param This parameter requiered an object with id and newData
   */
  const useUpdateCustomerById = ({ id, newData }) => {
    dispatch(updateCustomerById({ id, newData }))
  }

  /**
   * This method delete a Customer by Id
   * @param {number} id This parameter required a Id
   */
  const useDeleteCustomerById = (id) => {
    dispatch(deleteCustomerById(id))
  }

  /**
   * This method reset the List of Customers
   */
  const useResetCustomers = () => {
    dispatch(resetCustomers())
  }

  return {
    useInitCustomers,
    useAddCustomer,
    useUpdateCustomerById,
    useDeleteCustomerById,
    useResetCustomers,
    customers
  }
}

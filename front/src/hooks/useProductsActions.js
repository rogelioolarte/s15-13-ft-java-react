import {
  initProducts,
  addProduct,
  updateProductById,
  deleteProductById,
  resetProducts
} from '../store/productsSlice'
import { useAppDispatch, useAppSelector } from './store'

export const useProductsActions = () => {
  const products = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()

  /**
   * This method add a List of Products
   * @param {[]} data This parameter required a array of Products
   */
  const useInitProducts = (data) => {
    dispatch(initProducts(data))
  }

  /**
   * This method add a Product
   * @param {object} data This parameter required a Product Object
   */
  const useAddProduct = (data) => {
    dispatch(addProduct(data))
  }

  /**
   * This method update a Product by Id
   * @param {object} param This parameter requiered an object with id and newData
   */
  const useUpdateProductById = ({ id, newData }) => {
    dispatch(updateProductById({ id, newData }))
  }

  /**
   * This method delete a Purchase by Id
   * @param {number} id This parameter required a Id
   */
  const useDeleteProductById = (id) => {
    dispatch(deleteProductById(id))
  }

  /**
   * This method reset the List of Purchases
   */
  const useResetProducts = () => {
    dispatch(resetProducts())
  }

  return {
    useInitProducts,
    useAddProduct,
    useUpdateProductById,
    useDeleteProductById,
    useResetProducts,
    products
  }
}

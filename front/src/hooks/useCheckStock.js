import { useEffect } from 'react'
import { useProductsActions } from './useProductsActions'
import { toast } from 'sonner'

const useCheckStock = () => {
  const { products } = useProductsActions()

  useEffect(() => {
    products.forEach(product => {
      if (product.minimal > product.stock) {
        toast.info(`Alert: The Product ${product.name} is close to being sold out.`,
          { duration: 2000, closeButton: true, position: 'top-right' })
      }
    })
  }, [products])
}

export default useCheckStock

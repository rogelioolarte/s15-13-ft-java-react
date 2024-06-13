import ActualDate from '../pure/ActualDate'
import AnalyticsDashboard from '../pure/AnalyticsDashboard'
import ShowUserData from '../pure/ShowUserData'
import { Navbar, Typography } from '@material-tailwind/react'
import Clock from '../pure/Clock'
import { useEffect } from 'react'
import { useManageAPI } from '../../hooks/useManageAPI'
import { useSalesActions } from '../../hooks/useSalesActions'
import { useGetAllCustomersQuery, useGetAllProductsQuery, useGetAllSuppliersQuery, useGetAllTaxesQuery, useGetPurchasesQuery, useGetSalesQuery } from '../../store/apiSlice'
import { usePurchasesActions } from '../../hooks/usePurchasesActions'
import { useSuppliersActions } from '../../hooks/useSuppliersActions'
import { useTaxesActions } from '../../hooks/useTaxesActions'
import { useProductsActions } from '../../hooks/useProductsActions'
import { useCustomersActions } from '../../hooks/useCustomersActions'

export default function DashboardSection () {
  const { useInitCustomers } = useCustomersActions()
  const {
    data: customersData,
    isLoading: isLoadingCustomer,
    isSuccess: isSuccessCustomer,
    isError: isErrorCustomer,
    error: errorCustomer
  } = useGetAllCustomersQuery()

  const { initAllEntities: useInitCustomersGetAll } = useManageAPI(
    'Customer',
    useInitCustomers,
    customersData,
    isLoadingCustomer,
    isSuccessCustomer,
    isErrorCustomer,
    errorCustomer
  )

  const { useInitProducts } = useProductsActions()
  const {
    data: productsData,
    isLoading: isLoadingProduct,
    isSuccess: isSuccessProduct,
    isError: isErrorProduct,
    error: errorProduct
  } = useGetAllProductsQuery()

  const { initAllEntities: useInitProductsGetAll } = useManageAPI(
    'Product',
    useInitProducts,
    productsData,
    isLoadingProduct,
    isSuccessProduct,
    isErrorProduct,
    errorProduct
  )

  const { useInitTaxes } = useTaxesActions()
  const {
    data: taxesData,
    isLoading: isLoadingTaxes,
    isSuccess: isSuccessTaxes,
    isError: isErrorTaxes,
    error: errorTaxes
  } = useGetAllTaxesQuery()

  const { initAllEntities: useInitTaxesGetAll } = useManageAPI(
    'Tax',
    useInitTaxes,
    taxesData,
    isLoadingTaxes,
    isSuccessTaxes,
    isErrorTaxes,
    errorTaxes
  )
  const { useInitSuppliers } = useSuppliersActions()
  const {
    data: suppliersData,
    isLoading: isLoadingSuppliers,
    isSuccess: isSuccessSuppliers,
    isError: isErrorSuppliers,
    error: errorSuppliers
  } = useGetAllSuppliersQuery()

  const { initAllEntities: useInitSuppliersGetAll } = useManageAPI(
    'Supplier',
    useInitSuppliers,
    suppliersData,
    isLoadingSuppliers,
    isSuccessSuppliers,
    isErrorSuppliers,
    errorSuppliers
  )

  const { useInitPurchases } = usePurchasesActions()
  const {
    data: purchasesData,
    isLoading: isLoadingPurchases,
    isSuccess: isSuccessPurchases,
    isError: isErrorPurchases,
    error: errorPurchases
  } = useGetPurchasesQuery()

  const { initAllEntities: useInitPurchasesGetAll } = useManageAPI(
    'Purchase',
    useInitPurchases,
    purchasesData,
    isLoadingPurchases,
    isSuccessPurchases,
    isErrorPurchases,
    errorPurchases
  )

  const { useInitSales } = useSalesActions()
  const {
    data: salesData,
    isLoading: isLoadingSales,
    isSuccess: isSuccessSales,
    isError: isErrorSales,
    error: errorSales
  } = useGetSalesQuery()

  const { initAllEntities: useInitSalesGetAll } = useManageAPI(
    'Sale',
    useInitSales,
    salesData,
    isLoadingSales,
    isSuccessSales,
    isErrorSales,
    errorSales
  )

  useEffect(() => {
    if (!isLoadingCustomer && isSuccessCustomer &&
        !isLoadingProduct && isSuccessProduct &&
        !isLoadingTaxes && isSuccessTaxes &&
        !isLoadingSuppliers && isSuccessSuppliers) {
      useInitCustomersGetAll()
      useInitProductsGetAll()
      useInitTaxesGetAll()
      useInitSuppliersGetAll()
    }
  }, [
    isLoadingCustomer, isSuccessCustomer,
    isLoadingProduct, isSuccessProduct,
    isLoadingTaxes, isSuccessTaxes,
    isLoadingSuppliers, isSuccessSuppliers
  ])

  useEffect(() => {
    if (!isLoadingCustomer && isSuccessCustomer &&
        !isLoadingProduct && isSuccessProduct &&
        !isLoadingTaxes && isSuccessTaxes &&
        !isLoadingSuppliers && isSuccessSuppliers &&
        !isLoadingPurchases && isSuccessPurchases &&
        !isLoadingSales && isSuccessSales) {
      useInitPurchasesGetAll()
      useInitSalesGetAll()
    }
  }, [
    isLoadingCustomer, isSuccessCustomer,
    isLoadingProduct, isSuccessProduct,
    isLoadingTaxes, isSuccessTaxes,
    isLoadingSuppliers, isSuccessSuppliers,
    isLoadingPurchases, isSuccessPurchases,
    isLoadingSales, isSuccessSales
  ])

  return (
    <div className='flex flex-col items-center justify-items-center w-full gap-4 md:gap-8 p-3'>
      <Navbar className='w-full max-w-screen-xl px-4 py-2 lg:px-8 text-[#212121] flex flex-col justify-center md:items-center md:justify-between md:flex-row gap-2'>
        <Typography as='a' className='flex font-bold'>
          <ActualDate />
        </Typography>
        <Clock />
        {/* Componente aun inestable */}
        {/* <SearchBar /> */}
      </Navbar>
      <ShowUserData />
      <AnalyticsDashboard />
    </div>
  )
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  MAIN_API,
  FAILED_ROUTE,
  ROUTE_LOGIN,
  ROUTE_GET_BY_DATE_PURCHASES,
  ROUTE_PURCHASE,
  ROUTE_GET_BY_DATE_SALES,
  ROUTE_SALE,
  ROUTE_GET_ALL_PRODUCTS,
  ROUTE_PRODUCT,
  ROUTE_GET_ALL_CUSTOMER,
  ROUTE_CUSTOMER,
  ROUTE_GET_ALL_SUPPLIERS,
  ROUTE_SUPPLIER,
  ROUTE_GET_ALL_TAXES,
  ROUTE_TAX
} from '../config/api_routes'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: MAIN_API.length !== 0 ? MAIN_API : 'https://reqres.in' }),
  endpoints: (build) => ({
    /**
     * * Login Query
     */
    login: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_LOGIN : '/api/login',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    /**
     * * Purchases Queries
     */
    getPurchases: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_GET_BY_DATE_PURCHASES : FAILED_ROUTE,
        method: 'GET',
        body: data
      })
    }),
    createPurchase: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PURCHASE : FAILED_ROUTE,
        method: 'POST',
        body: data
      })
    }),
    /**
     * * Sales Queries
     */
    getSales: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_GET_BY_DATE_SALES : FAILED_ROUTE,
        method: 'GET',
        body: data
      })
    }),
    createSale: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SALE : FAILED_ROUTE,
        method: 'POST',
        body: data
      })
    }),
    /**
     * Products Queries
     */
    getAllProducts: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_GET_ALL_PRODUCTS : FAILED_ROUTE
    }),
    findProductById: build.query({
      query: id => MAIN_API.length !== 0 ? ROUTE_PRODUCT + `/${id}` : FAILED_ROUTE
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PRODUCT : FAILED_ROUTE,
        method: 'POST',
        body: data
      })
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PRODUCT + `/${id}` : FAILED_ROUTE,
        method: 'PUT',
        body: data
      })
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PRODUCT + `/${id}` : FAILED_ROUTE,
        method: 'PATCH'
      })
    }),
    /**
     * Customers Queries
     */
    getAllCustomers: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_GET_ALL_CUSTOMER : FAILED_ROUTE
    }),
    findCustomerById: build.query({
      query: id => MAIN_API.length !== 0 ? ROUTE_CUSTOMER + `/${id}` : FAILED_ROUTE
    }),
    createCustomer: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_CUSTOMER : FAILED_ROUTE,
        method: 'POST',
        body: data
      })
    }),
    updateCustomer: build.mutation({
      query: ({ id, data }) => ({
        url: MAIN_API.length !== 0 ? ROUTE_CUSTOMER + `/${id}` : FAILED_ROUTE,
        method: 'PUT',
        body: data
      })
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: MAIN_API.length !== 0 ? ROUTE_CUSTOMER + `/${id}` : FAILED_ROUTE,
        method: 'PATCH'
      })
    }),
    /**
     * Suppliers Queries
     */
    getAllSuppliers: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_GET_ALL_SUPPLIERS : FAILED_ROUTE
    }),
    findSupplierById: build.query({
      query: id => MAIN_API.length !== 0 ? ROUTE_SUPPLIER + `/${id}` : FAILED_ROUTE
    }),
    createSupplier: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SUPPLIER : FAILED_ROUTE,
        method: 'POST',
        body: data
      })
    }),
    updateSupplier: build.mutation({
      query: ({ id, data }) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SUPPLIER + `/${id}` : FAILED_ROUTE,
        method: 'PUT',
        body: data
      })
    }),
    deleteSupplier: build.mutation({
      query: (id) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SUPPLIER + `/${id}` : FAILED_ROUTE,
        method: 'PATCH'
      })
    }),
    /**
     * Taxes Queries
     */
    getAllTaxes: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_GET_ALL_TAXES : FAILED_ROUTE
    }),
    findTaxById: build.query({
      query: id => MAIN_API.length !== 0 ? ROUTE_TAX + `/${id}` : FAILED_ROUTE
    }),
    createTax: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_TAX : FAILED_ROUTE,
        method: 'POST',
        body: data
      })
    }),
    updateTax: build.mutation({
      query: ({ id, data }) => ({
        url: MAIN_API.length !== 0 ? ROUTE_TAX + `/${id}` : FAILED_ROUTE,
        method: 'PUT',
        body: data
      })
    }),
    deleteTax: build.mutation({
      query: (id) => ({
        url: MAIN_API.length !== 0 ? ROUTE_TAX + `/${id}` : FAILED_ROUTE,
        method: 'PATCH'
      })
    })
  })
})

export const {
  useLoginMutation,
  // Sales
  useGetAllSalesMutation,
  // Purchases Queries
  useGetPurchasesMutation,
  useCreatePurchaseMutation,
  // Sales Queries
  useGetSalesMutation,
  useCreateSaleMutation,
  // Products Queries
  useGetAllProductsQuery,
  useFindProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  // Customers Queries
  useGetAllCustomersQuery,
  useFindCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  // Suppliers Queries
  useGetAllSuppliersQuery,
  useFindSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  // Taxes Queries
  useGetAllTaxesQuery,
  useFindTaxByIdQuery,
  useCreateTaxMutation,
  useUpdateTaxMutation,
  useDeleteTaxMutation
} = apiSlice

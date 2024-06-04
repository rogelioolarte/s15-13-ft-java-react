import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_API, ROUTE_LOGIN, ROUTE_PURCHASES, ROUTE_PRODUCT, ROUTE_SUPPLIER, ROUTE_SALES, ROUTE_TAXES, ROUTE_CUSTOMER } from '../config/api_routes'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: MAIN_API.length !== 0 ? MAIN_API : 'https://reqres.in' }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_LOGIN : '/api/login',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }), // Purchases
    purchases: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PURCHASES : '/api/purchase',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }), // Products
    getAllProducts: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_PRODUCT + '/all' : '/api/unknown'
    }),
    productCreate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PRODUCT : '/api/product',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    productUpdate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PRODUCT : '/api/product',
        method: 'PUT',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    productDelete: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PRODUCT : '/api/product',
        method: 'PATCH',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        param: data
      })
    }), // Suppliers
    getAllSuppliers: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_SUPPLIER + '/all' : '/api/unknown'
    }),
    supplierCreate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SUPPLIER : '/api/unknown',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    supplierUpdate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SUPPLIER : '/api/unknown',
        method: 'PUT',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    supplierDelete: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SUPPLIER : '/api/unknown',
        method: 'PATCH',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        param: data
      })
    }), // Sales
    getAllSales: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SALES + '/getbydate' : '/api/product',
        method: 'GET',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }), // Taxes
    getAllTaxes: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_TAXES + '/all' : '/api/unknown'
    }),
    taxeCreate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_TAXES : '/api/unknown',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    taxeUpdate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_TAXES : '/api/unknown',
        method: 'PUT',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    taxeEnable: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_TAXES + '/enable' : '/api/unknown',
        method: 'PATCH',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        param: data
      })
    }),
    taxeDisable: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_TAXES + '/disable' : '/api/unknown',
        method: 'PATCH',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        param: data
      })
    }), // Customers
    getAllCustomers: build.query({
      query: () => MAIN_API.length !== 0 ? ROUTE_CUSTOMER + '/allcustomer' : '/api/unknown'
    }),
    customerCreate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_CUSTOMER + '/savecustomer' : '/api/unknown',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    customerUpdate: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_CUSTOMER + '/updatecustomer' : '/api/unknown',
        method: 'PUT',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    }),
    customerDelete: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_SUPPLIER + '/deletecustomer' : '/api/unknown',
        method: 'PATCH',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        param: data
      })
    })
  })
})

export const {
  useLoginMutation,
  // Products
  useGetAllProductsQuery,
  useProductCreateMutation,
  useProductUpdateMutation,
  useProductDeleteMutation,
  // Suppliers
  useGetAllSuppliersQuery,
  useSupplierCreateMutation,
  useSupplierUpdateMutation,
  useSupplierDeleteMutation,
  // Sales
  useGetAllSalesMutation,
  // Purchases
  usePurchasesMutation,
  // Taxes
  useGetAllTaxesQuery,
  useTaxeCreateMutation,
  useTaxeUpdateMutation,
  useTaxeEnableMutation,
  useTaxeDisableMutation,
  // Customers
  useGetAllCustomersQuery,
  useCustomerCreateMutation,
  useCustomerUpdateMutation,
  useCustomerDeleteMutation
} = apiSlice

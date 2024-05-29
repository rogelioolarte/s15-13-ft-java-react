import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_API, ROUTE_LOGIN, ROUTE_PURCHASES, ROUTE_PRODUCT } from '../config/api_routes'
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
    }),
    purchases: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PURCHASES : '/api/purchase',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
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
    })
  })
})

export const { useLoginMutation, useProductCreateMutation, useProductUpdateMutation, useProductDeleteMutation, usePurchasesMutation } = apiSlice

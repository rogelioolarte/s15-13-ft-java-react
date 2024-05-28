import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_API, ROUTE_LOGIN, ROUTE_PRODUCT } from '../config/api_routes'

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
    product: build.mutation({
      query: (data) => ({
        url: MAIN_API.length !== 0 ? ROUTE_PRODUCT : '/api/product',
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-type': 'application/json' },
        body: data
      })
    })
  })
})

export const { useLoginMutation } = apiSlice

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import salesReducer from './salesSlice'
import purchasesReducer from './purchasesSlice'
import productsReducer from './productsSlice'
import customersReducer from './customersSlice'
import taxesReducer from './taxesSlice'
import suppliersReducer from './suppliersSlice'
import { apiSlice } from './apiSlice'

const persistanceSessionStorageMiddleware = (store) => (next) => (action) => {
  next(action)
  window.sessionStorage.setItem('session_state', JSON.stringify(store.getState()))
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    sales: salesReducer,
    purchases: purchasesReducer,
    products: productsReducer,
    customers: customersReducer,
    taxes: taxesReducer,
    suppliers: suppliersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(persistanceSessionStorageMiddleware).concat(apiSlice.middleware)
})

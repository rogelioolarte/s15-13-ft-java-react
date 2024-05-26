import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import salesReducer from './salesSlice'
import purchasesReducer from './purchasesSlice'
import productsReducer from './productsSlice'
import customersReducer from './customersSlice'
import { apiSlice } from './apiSlice'

const persistanceSessionStorageMiddleware = (store) => (next) => (action) => {
  next(action)
  window.sessionStorage.setItem('session__state', JSON.stringify(store.getState()))
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    sales: salesReducer,
    purchases: purchasesReducer,
    products: productsReducer,
    customers: customersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(persistanceSessionStorageMiddleware).concat(apiSlice.middleware)
})

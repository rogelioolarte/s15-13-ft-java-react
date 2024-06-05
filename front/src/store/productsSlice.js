import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = []

const initialState = (() => {
  const persistedState = window.sessionStorage.getItem('session__state')
  return persistedState ? JSON.parse(persistedState).products : DEFAULT_STATE
})()

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initProducts: (state, action) => {
      return [...action.payload]
    },
    addProduct: (state, action) => {
      return [...state, { ...action.payload }]
    },
    updateProductById: (state, action) => {
      const { id, newData } = action.payload
      return state.map(product => (product.id === id ? { ...product, ...newData } : product))
    },
    deleteProductById: (state, action) => {
      return state.filter(product => product.id !== action.payload)
    },
    resetProducts: (state, action) => {
      return DEFAULT_STATE
    }
  }
})

export default productsSlice.reducer
export const {
  initProducts,
  addProduct,
  updateProductById,
  deleteProductById,
  resetProducts
} = productsSlice.actions

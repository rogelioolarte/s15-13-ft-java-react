import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = []

const initialState = (() => {
  const persistedState = window.sessionStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).sales : DEFAULT_STATE
})()

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    initSales: (state, action) => {
      return [...action.payload]
    },
    addSale: (state, action) => {
      return [...state, { ...action.payload }]
    },
    updateSaleById: (state, action) => {
      const { id, newData } = action.payload
      return state.map(sale => (sale.id === id ? { ...sale, ...newData } : sale))
    },
    deleteSaleById: (state, action) => {
      return state.filter(sale => sale.id !== action.payload)
    },
    resetSales: (state, action) => {
      return DEFAULT_STATE
    }
  }
})

export default salesSlice.reducer
export const { initSales, addSale, updateSaleById, deleteSaleById, resetSales } = salesSlice.actions

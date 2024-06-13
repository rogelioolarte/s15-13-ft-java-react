import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = []

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).suppliers : DEFAULT_STATE
})()

export const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    initSuppliers: (state, action) => {
      return [...action.payload]
    },
    addSupplier: (state, action) => {
      return [...state, { ...action.payload }]
    },
    updateSupplierById: (state, action) => {
      const { id, newData } = action.payload
      return state.map(supplier => (supplier.id === id ? { ...supplier, ...newData } : supplier))
    },
    deleteSupplierById: (state, action) => {
      return state.filter(supplier => supplier.id !== action.payload)
    },
    resetSuppliers: () => {
      return DEFAULT_STATE
    }
  }
})

// Selector
export const selectSuppliers = state => state.suppliers

export default suppliersSlice.reducer
export const {
  initSuppliers,
  addSupplier,
  updateSupplierById,
  deleteSupplierById,
  resetSuppliers
} = suppliersSlice.actions

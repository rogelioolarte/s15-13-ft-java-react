import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = []

const initialState = (() => {
  const persistedState = window.sessionStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).suppliers : DEFAULT_STATE
})()

export const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    initSuppliers: (state, action) => {
      return [...state, ...action.payload]
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
    resetSuppliers: (state, action) => {
      return DEFAULT_STATE
    }
  }
})

export default suppliersSlice.reducer
export const {
  initSuppliers,
  addSupplier,
  updateSupplierById,
  deleteSupplierById,
  resetSuppliers
} = suppliersSlice.actions

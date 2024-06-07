import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = []

const initialState = (() => {
  const persistedState = window.sessionStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).taxes : DEFAULT_STATE
})()

export const taxesSlice = createSlice({
  name: 'taxes',
  initialState,
  reducers: {
    initTaxes: (state, action) => {
      return [...action.payload]
    },
    addTax: (state, action) => {
      return [...state, { ...action.payload }]
    },
    updateTaxById: (state, action) => {
      const { id, newData } = action.payload
      return state.map(tax => (tax.id === id ? { ...tax, ...newData } : tax))
    },
    deleteTaxById: (state, action) => {
      return state.filter(tax => tax.id !== action.payload)
    },
    resetTaxes: (state, action) => {
      return DEFAULT_STATE
    }
  }
})

export default taxesSlice.reducer
export const {
  initTaxes,
  addTax,
  updateTaxById,
  deleteTaxById,
  resetTaxes
} = taxesSlice.actions

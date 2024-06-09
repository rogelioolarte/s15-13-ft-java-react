import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = []

const initialState = (() => {
  const persistedState = window.sessionStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).customers : DEFAULT_STATE
})()

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    initCustomers: (state, action) => {
      return [...action.payload]
    },
    addCustomer: (state, action) => {
      return [...state, { ...action.payload }]
    },
    updateCustomerById: (state, action) => {
      const { id, newData } = action.payload
      return state.map(customer => (customer.id === id ? { ...customer, ...newData } : customer))
    },
    deleteCustomerById: (state, action) => {
      return state.filter(sale => sale.id !== action.payload)
    },
    resetCustomers: (state, action) => {
      return DEFAULT_STATE
    }
  }
})

export default customersSlice.reducer
export const {
  initCustomers,
  addCustomer,
  updateCustomerById,
  deleteCustomerById,
  resetCustomers
} = customersSlice.actions

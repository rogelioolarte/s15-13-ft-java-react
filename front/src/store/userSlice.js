import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  id: '',
  first_name: '',
  last_name: '',
  email: ''
}

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).user : DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetUser: (state, action) => {
      return DEFAULT_STATE
    }
  }
})

export default userSlice.reducer
export const { resetUser, setUser } = userSlice.actions

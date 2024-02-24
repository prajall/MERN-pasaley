import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoggedInState {
  loginState: boolean
}

const initialState: LoggedInState = {
  loginState: false,
}

export const counterSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn=true
    },
    logout: (state) => {
      state.loggedIn=false
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { login,logout } = counterSlice.actions

export default counterSlice.reducer


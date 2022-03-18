import { createSlice } from '@reduxjs/toolkit'
import StorageKeys from 'constants/storage-keys'
import { login, register } from './userAsyncThunk'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {
      loading: false,
    },
  },

  reducers: {
    logout(state, action) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.TOKEN)
      // reset current state
      state.current = {}
    },
  },

  extraReducers: {
    [register.pending]: (state) => {
      state.setting.loading = true
    },

    [register.fulfilled]: (state, action) => {
      state.current = action.payload
      state.setting.loading = false
    },

    [register.rejected]: (state, action) => {
      console.log('rejected value, check register form')
      state.setting.loading = false
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload
    },
  },
})

const { actions, reducer } = userSlice
export const { logout } = actions
export default reducer

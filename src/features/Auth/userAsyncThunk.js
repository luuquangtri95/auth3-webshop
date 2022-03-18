import { createAsyncThunk } from '@reduxjs/toolkit'
import userApi from 'apis/userApi'
import StorageKeys from 'constants/storage-keys'

export const register = createAsyncThunk('user/register', async (payload) => {
  // call api to register
  const data = await userApi.register(payload)

  // save data to localstorage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt)
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))

  return data.user
})

export const login = createAsyncThunk('user/login', async (payload) => {
  // call api to register
  const data = await userApi.login(payload)

  // save data to localstorage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt)
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))

  return data.user
})

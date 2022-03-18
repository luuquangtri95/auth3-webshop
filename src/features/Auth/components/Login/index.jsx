import { unwrapResult } from '@reduxjs/toolkit'
import { login } from 'features/Auth/userAsyncThunk'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from '../LoginForm'

function Login({ closeDialog = null }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values) => {
    try {
      // auto set username = email

      const action = login(values)
      const resultAction = await dispatch(action)

      console.log('resultAction', resultAction)

      const user = unwrapResult(resultAction)

      closeDialog?.()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    // page / container
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Login

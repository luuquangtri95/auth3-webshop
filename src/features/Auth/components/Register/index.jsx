import { unwrapResult } from '@reduxjs/toolkit'
import { register } from 'features/Auth/userAsyncThunk'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import RegisterFrom from '../RegisterForm'

function Register({ closeDialog = null }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email

      const action = register(values)
      const resultAction = await dispatch(action)

      console.log('resultAction', resultAction)

      const user = unwrapResult(resultAction)

      closeDialog?.()

      enqueueSnackbar('register successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    // page / container
    <div>
      <RegisterFrom onSubmit={handleSubmit} />
    </div>
  )
}

export default Register

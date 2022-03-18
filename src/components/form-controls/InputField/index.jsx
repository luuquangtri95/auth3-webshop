import TextField from '@material-ui/core/TextField'
import React from 'react'
import { Controller } from 'react-hook-form'

InputField.propTypes = {}

function InputField({ name, form, label }) {
  const { errors } = form
  const hasError = errors[name]

  return (
    <Controller
      control={form.control}
      name={name}
      as={TextField}
      label={label}
      fullWidth
      margin='normal'
      variant='outlined'
      error={!!hasError}
      helperText={errors[name]?.message}
    />
  )
}

export default InputField

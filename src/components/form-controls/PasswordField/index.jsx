import { FormHelperText } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

function PasswordField({ form, name, label }) {
  const [showPassword, setShowPassword] = useState(false)
  const { formState, errors } = form
  const hasError = errors[name]
  return (
    <FormControl error={!!hasError} fullWidth margin='normal' variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
      <Controller
        control={form.control}
        name={name}
        render={({ onChange, onBlur, value, name }) => (
          <OutlinedInput
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />

      <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  )
}

export default PasswordField

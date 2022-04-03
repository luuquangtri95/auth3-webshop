import { Box, FormHelperText, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Controller } from 'react-hook-form'

const useStyle = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    maxWidth: '200px',
  },
  label: {
    marginBottom: '12px',
  },
  button: {},
}))

function QuantityField({ form, name, label }) {
  const { formState, errors, setValue } = form
  const hasError = errors[name]
  const classes = useStyle()

  return (
    <FormControl error={!!hasError} margin='normal' variant='outlined' size='small'>
      {/* <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel> */}
      {/* <Typography className={classes.label} variant='span' color='initial'>
        Quantity:
      </Typography> */}
      <Controller
        control={form.control}
        name={name}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
              }
            >
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput
              id={name}
              type='number'
              // label={label}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
            />

            <IconButton>
              <AddCircleOutline
                onClick={() =>
                  setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
                }
              />
            </IconButton>
          </Box>
        )}
      />

      <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  )
}

export default QuantityField

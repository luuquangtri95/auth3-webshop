import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'

const useStyle = makeStyles((theme) => ({
  root: {},
  salePrice: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    '& > button:first-child': {
      marginRight: '15px',
    },
  },
}))

function FilterByPriceRange({ onChange = null }) {
  const classes = useStyle()
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  })

  const handleChange = (e) => {
    const value = e.target.value
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }))
  }

  const handleSubmit = () => {
    onChange?.(values)
  }

  const handleResetValue = () => {
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    })
  }

  return (
    <Box className={classes.root} padding={1}>
      <Typography variant='subtitle2'>Giá:</Typography>

      <Box className={classes.salePrice} marginBottom={2} marginTop={2}>
        <TextField
          name='salePrice_gte'
          variant='outlined'
          size='small'
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <span> - </span>
        <TextField
          variant='outlined'
          name='salePrice_lte'
          size='small'
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>

      <Box className={classes.buttons}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          disabled={values.salePrice_gte === 0 || values.salePrice_lte === 0}
        >
          Áp Dụng
        </Button>

        <Button variant='contained' color='secondary' onClick={handleResetValue}>
          Reset
        </Button>
      </Box>
    </Box>
  )
}

export default FilterByPriceRange

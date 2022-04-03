import { Box, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { THUMBNAIL_PLACEHOLDER } from 'constants'
import { STATIC_HOST } from 'constants'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  },
  image: {
    maxWidth: '60px',
  },
}))

function MiniCart({ cartItem }) {
  const thumbnailUrl = cartItem.product.thumbnail
    ? `${STATIC_HOST}${cartItem.product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER

  const classes = useStyle()

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <img src={thumbnailUrl} alt='' className={classes.image} />
        <Typography variant='caption' color='primary'>
          {cartItem.product.name}
        </Typography>
        <Typography variant='caption' color='primary' gutterBottom>
          SL: {cartItem.quantity}
        </Typography>
      </Box>
    </Box>
  )
}

export default MiniCart

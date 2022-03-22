import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { formatPrice } from 'utils'

const useStyle = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  description: {
    margin: theme.spacing(2, 0, 2, 0),
  },

  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },

  salePrice: {
    marginRight: theme.spacing(2),
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
}))

function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product
  const classes = useStyle()

  return (
    <Box className={classes.root}>
      <Typography component='h1' variant='h4'>
        {name}
      </Typography>

      <Typography variant='body2' className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component='span' className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        <Box component='span' className={classes.originalPrice}>
          {formatPrice(originalPrice)}
        </Box>
        <Box component='span' className={classes.promotionPercent}>
          {promotionPercent > 0 ? `-${promotionPercent}%` : ''}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductInfo
import { Box, Typography } from '@material-ui/core'
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants'
import React from 'react'

function ProductComponent({ product = {} }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER

  return (
    <Box p={1}>
      <Box p={1}>
        <img src={thumbnailUrl} minHeight='215px' width='100%' alt={product.name} />
      </Box>
      <Box p={1}>
        <Typography variant='body2'>{product.name}</Typography>
        <Typography variant='body2'>
          <Box component='span' fontSize='16px' fontWeight='bold' mr={1}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              product.salePrice
            )}
          </Box>
          {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProductComponent

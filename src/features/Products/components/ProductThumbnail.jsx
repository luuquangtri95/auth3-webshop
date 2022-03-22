import { Box } from '@material-ui/core'
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants'
import React from 'react'

function ProductThumbnail({ product = {} }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER

  return (
    <Box>
      <img src={thumbnailUrl} alt='' />
    </Box>
  )
}

export default ProductThumbnail

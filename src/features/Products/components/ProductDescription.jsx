import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'

ProductDescription.propTypes = {}

function ProductDescription({ product = {} }) {
  const { description } = product

  // cần sanitize trước khi render lên html để tránh trường hợp bị XSS attack => dùng DOMpurify
  return (
    <Paper
      style={{ padding: '15px' }}
      elevation={0}
      dangerouslySetInnerHTML={{ __html: description }}
    ></Paper>
  )
}

export default ProductDescription

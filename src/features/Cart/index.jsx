import { Box } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { cartTotalSelector } from './selectors'

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector)

  return <Box></Box>
}

export default CartFeature

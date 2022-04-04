import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import QuantityField from 'components/form-controls/QuantityField'
import { THUMBNAIL_PLACEHOLDER } from 'constants'
import { STATIC_HOST } from 'constants'
import { removeFromCart, setQuantity } from 'features/Cart/cartSlice'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    maxWidth: '100px',
  },
  quantity: {
    width: 'auto !important',
  },
}))

function CartItem({ cartItem, onSubmit }) {
  const thumbnailUrl = cartItem.product.thumbnail
    ? `${STATIC_HOST}${cartItem.product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER

  const form = useForm({
    defaultValues: {
      quantity: cartItem.quantity,
    },
  })

  const dispatch = useDispatch()

  const handleDeleteCartItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleSubmit = (value) => {
    const newValue = {
      ...value,
      id: cartItem.id,
    }

    dispatch(setQuantity(newValue))
  }

  const classes = useStyle()

  return (
    <Box className={classes.root}>
      <img className={classes.image} src={thumbnailUrl} alt='' />
      <Typography variant='body2' color='primary'>
        {cartItem.product.name}
      </Typography>

      <form
        style={{ display: 'flex', alignItems: 'center' }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <QuantityField className={classes.quantity} form={form} name='quantity' />

        <Button type='submit'>cập nhật</Button>
      </form>

      <Button color='secondary' onClick={() => handleDeleteCartItem(cartItem.id)}>
        Delete
      </Button>
    </Box>
  )
}

export default CartItem

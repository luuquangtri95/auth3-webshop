import { Box, Container, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CartItem from 'components/CartItem'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatPrice } from 'utils'
import { cartTotalSelector } from './selectors'

const useStyle = makeStyles((theme) => ({
  root: {},
  right: {
    width: '250px',
  },
  left: {
    flex: '1 1 auto',
  },
}))

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector)
  const cartItems = useSelector((state) => state.cart.cartItems)

  const classes = useStyle()

  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <Box component='ul'>
                {cartItems.map((x) => (
                  <CartItem key={x.id} cartItem={x} />
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <Box mt={2} textAlign='center'>
                <Typography variant='h5' color='initial'>
                  Tổng tiền: {formatPrice(cartTotal)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CartFeature

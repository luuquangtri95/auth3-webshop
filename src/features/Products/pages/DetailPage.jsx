import { Box, CircularProgress, Container, Grid, makeStyles, Paper } from '@material-ui/core'
import useProductDetail from 'hooks/useProductDetail'
import React from 'react'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import AddToCartForm from '../components/AddToCartForm'
import ProductInfo from '../components/ProductInfo'
import ProductThumbnail from '../components/ProductThumbnail'

const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: '475px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    padding: theme.spacing(1.5),
    flex: '1 1 0',
  },
}))

function DetailPage(props) {
  const classes = useStyle()
  const {
    params: { productId },
  } = useRouteMatch()

  const { product, loading } = useProductDetail(productId)

  if (loading) {
    return (
      <Box textAlign='center'>
        <CircularProgress />
      </Box>
    )
  }

  const handleAddToCartSubmit = (formValue) => {
    console.log(formValue)
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default DetailPage

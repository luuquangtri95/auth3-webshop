import { Box, CircularProgress, Container, Grid, makeStyles, Paper } from '@material-ui/core'
import useProductDetail from 'hooks/useProductDetail'
import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import AddToCartForm from '../components/AddToCartForm'
import ProductAdditional from '../components/ProductAdditional'
import ProductDescription from '../components/ProductDescription'
import ProductInfo from '../components/ProductInfo'
import ProductMenu from '../components/ProductMenu'
import ProductReviews from '../components/ProductReviews'
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
    url,
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
  console.log(url)
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
          <ProductMenu />
        </Paper>

        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} exact>
            <ProductAdditional />
          </Route>
          <Route path={`${url}/reviews`} exact>
            <ProductReviews />
          </Route>
        </Switch>
      </Container>
    </Box>
  )
}

export default DetailPage

import { Box, Grid } from '@material-ui/core'
import React from 'react'
import ProductComponent from './ProductComponent'

function ProductList({ productList = [] }) {
  return (
    <Box>
      <Grid container>
        {productList.map((product, index) => (
          <Grid item xs={12} sm={2} md={4} lg={3}>
            <ProductComponent product={product} key={product.id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList

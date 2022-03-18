import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

function ProductSkeletonList({ length = 12 }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={2} md={4} lg={3}>
            <Box p={1}>
              <Skeleton variant='rect' width='100%' height={230} />
              <Skeleton width='100%' />
              <Skeleton width='60%' />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductSkeletonList

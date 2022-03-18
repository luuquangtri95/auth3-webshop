import { Box, Container, Grid, Paper } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import productApi from 'apis/productApi'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import FilterViewer from '../components/FilterViewer'
import ProductList from '../components/ProductList'
import ProductsFilterList from '../components/ProductsFilterList'
import ProductSkeletonList from '../components/ProductSkeletonList'
import ProductSort from '../components/ProductSort'
import queryString from 'query-string'
const useStyle = makeStyles((theme) => ({
  root: {},
  left: { width: '250px' },
  right: { flex: '1 1 0' },
}))

function ListPage(props) {
  const classes = useStyle()
  const history = useHistory()
  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  console.log(queryParams)
  const [productList, setProductList] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 12,
  })
  const [loading, setLoading] = useState(true)
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 12,
  //   _sort: 'salePrice:ASC',
  // })

  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 12,
    _sort: queryParams._sort || 'salePrice:ASC',
  }))

  useEffect(() => {
    ;(async () => {
      try {
        const response = await productApi.getAll(filters)
        const { data, pagination } = response

        setProductList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('fail to fetch product list')
      }

      setLoading(false)
    })()
  }, [filters])

  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }, [filters, history])

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }))
  }

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }))
  }

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilters,
    }))
  }

  const handleViewerChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <Box component='section' mt={2}>
      <Container>
        <Grid container spacing={0}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductsFilterList filters={filters} onChange={handleFiltersChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              <FilterViewer filters={filters} onChange={handleViewerChange} />
              {loading && <ProductSkeletonList />}
              {!loading && <ProductList productList={productList} />}

              <Box
                paddingBottom={3}
                paddingTop={3}
                display='flex'
                justifyContent='center'
                flexWrap='nowrap'
              >
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color='primary'
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ListPage

import { Box } from '@material-ui/core'
import React from 'react'
import FilterByCategory from './filterList/FilterByCategory'
import FilterByPriceRange from './filterList/FilterByPriceRange'
import FilterByService from './filterList/FilterByService'

function ProductsFilterList({ filters = {}, onChange = null }) {
  const handleCategoryChange = (newCategoryName) => {
    // console.log('newCategoryName', newCategoryName)
    const newFilters = {
      ...filters,
      'category.name': newCategoryName,
    }

    onChange?.(newFilters)
  }

  const handleFilterChange = (values) => {
    const newFilters = {
      ...filters,
      ...values,
    }

    onChange?.(newFilters)
  }

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPriceRange onChange={handleFilterChange} />
      <FilterByService filters={filters} onChange={handleFilterChange} />
    </Box>
  )
}

export default ProductsFilterList

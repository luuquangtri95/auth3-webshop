import { Tab, Tabs } from '@material-ui/core'
import React from 'react'

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, newValue) => {
    onChange?.(newValue)
  }

  return (
    <Tabs
      value={currentSort}
      indicatorColor='primary'
      textColor='primary'
      onChange={handleSortChange}
      aria-label='disabled tabs example'
    >
      <Tab label='Giá thấp đến cao' value='salePrice:ASC'></Tab>
      <Tab label='Giá cao đến thấp' value='salePrice:DESC'></Tab>
    </Tabs>
  )
}

export default ProductSort

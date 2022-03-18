import { Box, Chip, makeStyles } from '@material-ui/core'
import React, { useMemo } from 'react'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: ' none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}))

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao Hàng Miễn Phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters }

      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip
      } else {
        newFilters.isFreeShip = true
      }

      return newFilters
    },
  },

  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('isPromotion'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilter = { ...filters }
      delete newFilter.isPromotion

      return newFilter
    },
    onToggle: () => {},
  },

  {
    id: 3,
    getLabel: (filters) => `Danh Muc: ${filters['category.name']}`,
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('category.name'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilter = { ...filters }
      delete newFilter['category.name']

      return newFilter
    },
    onToggle: () => {},
  },

  {
    id: 4,
    getLabel: (filters) => `Khoảng Giá Từ: ${filters.salePrice_gte}đ - ${filters.salePrice_lte}đ`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_gte') &&
      Object.keys(filters).includes('salePrice_lte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilter = { ...filters }

      delete newFilter.salePrice_gte
      delete newFilter.salePrice_lte

      return newFilter
    },
    onToggle: () => {},
  },
]

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyle()

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])

  return (
    <Box component='ul' className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            size='small'
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable ? null : () => {}}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    const newFilter = x.onToggle(filters)

                    onChange?.(newFilter)
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    const newFilter = x.onRemove(filters)

                    onChange?.(newFilter)
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  )
}

export default FilterViewer

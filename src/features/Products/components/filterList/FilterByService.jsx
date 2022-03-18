import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  root: {},
  ulElement: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
}))

function FilterByService({ filters = {}, onChange = null }) {
  const classes = useStyle()
  const handleServiceChange = (e) => {
    const { name, checked } = e.target

    onChange?.({ [name]: checked })
  }

  return (
    <Box p={1}>
      <Typography variant='subtitle2'>Dịch Vụ</Typography>

      <ul className={classes.ulElement}>
        {[
          { value: 'isFreeShip', label: 'Vận Chuyển Miễn Phí' },
          { value: 'isPromotion', label: 'Có Khuyến Mãi' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleServiceChange}
                  name={service.value}
                  color='primary'
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default FilterByService

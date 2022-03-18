import { Box, Divider, makeStyles, Typography } from '@material-ui/core'
import categoryApi from 'apis/categoryApi'
import React, { useState } from 'react'
import { useEffect } from 'react'

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  menu: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    '& > li': {
      padding: theme.spacing(1),
      '&:hover': {
        cursor: 'pointer',
        color: '#3f51b5',
      },
    },
  },
}))

function FilterByCategory({ onChange = null }) {
  const [categoryList, setCategoryList] = useState([])
  const classes = useStyle()

  useEffect(() => {
    ;(async () => {
      try {
        const list = await categoryApi.getAll()
        const byPassList = list.map((x) => ({
          id: x.id,
          name: x.name,
        }))

        /**
         * byPassList function: Lọc lại những giá trị cần thiết
         */
        console.log(byPassList)
        setCategoryList(byPassList)
      } catch (error) {
        console.log('fail to fetch')
      }
    })()
  }, [])

  const handleCategoryClick = (category) => {
    onChange?.(category.name)
  }

  return (
    <Box className={classes.root}>
      <Typography variant='subtitle2' color='initial'>
        Danh Mục Sản Phẩm
      </Typography>

      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
        ))}
      </ul>
      <Divider />
    </Box>
  )
}

export default FilterByCategory

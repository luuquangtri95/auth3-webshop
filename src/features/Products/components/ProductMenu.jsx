import React from 'react'
import PropTypes from 'prop-types'
import { Box, Link, makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: theme.spacing(2, 4),
    },
    '& > li > a': {
      color: theme.palette.grey[700],
    },
    '& > li > a.active': {
      color: theme.palette.primary.main,
      TextDecoder: 'underline',
      fontWeight: 'bold',
    },
  },
}))

function ProductMenu(props) {
  const classes = useStyle()
  const match = useRouteMatch()
  const { url } = match

  return (
    <Box component='ul' className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  )
}

export default ProductMenu

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import NotFound from 'components/NotFound'

ProductFeature.propTypes = {}

function ProductFeature(props) {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route path={match.path} component={ListPage} exact />
      <Route path={`${match.path}/:productId`} component={DetailPage} />

      <Route component={NotFound} />
    </Switch>
  )
}

export default ProductFeature

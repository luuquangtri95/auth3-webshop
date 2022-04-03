import NotFound from 'components/NotFound'
import CartFeature from 'features/Cart'
import ProductFeature from 'features/Products'
import { Route } from 'react-router-dom'
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import './App.css'
import Header from './components/Header/Index'

function App() {
  return (
    <div className='App'>
      <Header />

      <Switch>
        <Redirect from='/' to='/products' exact />

        <Route path='/products' component={ProductFeature} />
        <Route path='/cart' component={CartFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App

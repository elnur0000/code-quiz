import React, { useEffect, useState } from 'react'
import Navbar from './layout/Navbar'
import setAuthToken from '../utils/setAuthToken'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import Landing from '../components/layout/Landing'
import Footer from '../components/layout/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './routing/Routes'
import { loadUser } from '../actions/auth'

import { Provider } from 'react-redux'
import store from '../store'

function App () {
  useEffect(() => {
    setAuthToken(localStorage.token)
    store.dispatch(loadUser())
  }, [])
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>

            <Switch>
              <Route exact path='/'>
                <Navbar />
                <Landing />
                <Footer />
              </Route>
              <Route component={Routes} />
            </Switch>

          </Router>
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App

import React from 'react'
import Register from '../auth/Register'
import Login from '../auth/Login'
import { Route, Switch, Redirect } from 'react-router-dom'
import Alert from '../layout/Alert'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'

const Routes = () => {
  return (
    <div>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/reset-password/:token' component={ResetPassword} />
        {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default Routes

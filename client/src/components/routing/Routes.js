import React from 'react'
import Register from '../auth/Register'
import Login from '../auth/Login'
import { Route, Switch, Redirect } from 'react-router-dom'
import Alert from '../layout/Alert'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'
import Dashboard from '../dashboard/Dashboard'
import TestList from '../test/TestList'
import ProblemList from '../problem/ProblemList'
import GroupList from '../group/GroupList'

const Routes = () => {
  return (
    <div>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/reset-password/:token' component={ResetPassword} />
        <PrivateRoute
          component={TestList}
          exact
          layout={Dashboard}
          path='/dashboard'
        />
        <PrivateRoute
          component={ProblemList}
          exact
          layout={Dashboard}
          path='/problems'
        />
        <PrivateRoute
          component={GroupList}
          exact
          layout={Dashboard}
          path='/groups'
        />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default Routes

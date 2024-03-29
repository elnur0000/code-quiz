import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  auth: { isAuthenticated, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !user ? (
        <Spinner />
      ) : isAuthenticated

        ? Layout
          ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : <Component {...props} />
        : (
          <Redirect to='/login' />)}
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)

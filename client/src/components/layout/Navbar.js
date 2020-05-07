import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import logo from '../../img/vectorpaint.png'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  },
  appBar: {
    opacity: 0.9
  },
  logo: {
    height: '4em',
    color: 'white'
  }
}))

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles()
  const guestLinks = (
    <>
      <Link
        color='inherit'
        variant='h6'
        underline='none'
        className={classes.rightLink}
        component={RouterLink}
        to='/login'
      >
        {'Sign In'}
      </Link>
      <Link
        variant='h6'
        underline='none'
        className={clsx(classes.rightLink, classes.linkSecondary)}
        component={RouterLink}
        to='/register'
      >
        {'Sign Up'}
      </Link>
    </>
  )

  const authLinks = (
    <Link
      variant='h6'
      underline='none'
      className={clsx(classes.rightLink, classes.linkSecondary)}
      onClick={logout}
      component={RouterLink}
      to='/'
    >
      LOGOUT
    </Link>
  )
  return (
    <>
      <AppBar className={classes.appBar} position='fixed' color='primary'>
        <Toolbar className={classes.toolbar}>
          <img className={classes.logo} alt='main logo' src={logo} />
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            className={classes.title}
            component={RouterLink}
            to='/'
          >
            CODEQUIZ
          </Link>
          <div className={classes.right}>
            {(
              <>{isAuthenticated ? authLinks : guestLinks}</>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import logo from '../../img/vectorpaint.png'
import clsx from 'clsx'

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

const Navbar = () => {
  const classes = useStyles()
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
            {'codeQuiz'}
          </Link>
          <div className={classes.right}>
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
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

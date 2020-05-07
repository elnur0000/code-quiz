import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Grid } from '@material-ui/core'
import backgroundImage from '../../img/coding.jpg'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(coding.jpg)',
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    flexGrow: 1,
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      minHeight: 500,
      maxHeight: 1300
    }
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    },
    opacity: 0.8
  },
  more: {
    marginTop: theme.spacing(2)
  },

  line: {
    marginTop: '1rem',
    height: '0.25rem',
    width: '6rem',
    backgroundColor: theme.palette.secondary.main
  }
}))
const Landing = ({ isAuthenticated }) => {
  const classes = useStyles()
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <section className={classes.root}>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
      >

        <div className={classes.background} />
        <img style={{ display: 'none' }} src={backgroundImage} alt='increase priority' />
        <Typography color='inherit' align='center' variant='h2' marked='center'>
        Test Programmers
        </Typography>
        <div className={classes.line} />
        <Typography color='inherit' variant='h5' className={classes.h5}>
        Hire or test Programmers based on their coding skills
        </Typography>
        <Button
          color='secondary'
          variant='contained'
          size='large'
          className={classes.button}
          component={Link}
          to='/register'
        >
          Register
        </Button>
        <Typography variant='body2' color='inherit' className={classes.more}>
Discover the experience
        </Typography>

      </Grid>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)

import React, { useState, useEffect } from 'react'
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  makeStyles,
  CircularProgress
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { resetPasswordRequest } from '../../actions/auth'
import { tick, resetCountdown } from '../../actions/countdown'
import store from '../../store'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  }
  // buttonProgress: {
  //   color: theme.palette.secondary.main
  // }
}))

const ForgotPassword = ({ isAuthenticated, resetPasswordRequest, tick, resetCountdown, seconds, minutes }) => {
  const classes = useStyles()
  useEffect(() => {
    return () => {
      resetCountdown()
    }
  }, [])
  const [email, setEmail] = useState('')
  const [emailHelper, setEmailHelper] = useState('')
  const [isLoading, setLoading] = useState(false)
  const onChange = e => {
    setEmail(e.target.value)
    const valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
    if (!valid) {
      setEmailHelper('Invalid email')
    } else {
      setEmailHelper('')
    }
    if (seconds > 0 || minutes > 0) {
      resetCountdown()
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await resetPasswordRequest(email)
    setLoading(false)
    startCountdown()
  }
  const startCountdown = () => {
    const interval = setInterval(() => {
      const { seconds, minutes } = store.getState().countdown
      if (seconds === 0 && minutes === 0) {
        return clearInterval(interval)
      }
      tick()
    }, 1000)
  }
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
        Reset Password
        </Typography>
        <form onSubmit={e => onSubmit(e)} className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={e => onChange(e)}
            error={!!emailHelper}
            helperText={emailHelper}
            autoFocus
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
            disabled={Boolean(emailHelper || !email || isLoading || seconds > 0 || minutes > 0)}
          >
            {isLoading ? <CircularProgress color='secondary' size={24} className={classes.buttonProgress} />
              : seconds > 0 || minutes > 0 ? minutes + ':' + (seconds < 10 ? '0' : '') + seconds
                : 'Send'}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to='/login' variant='body2'>
              Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

  )
}

ForgotPassword.propTypes = {
  isAuthenticated: PropTypes.bool,
  resetPasswordRequest: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired,
  resetCountdown: PropTypes.func.isRequired,
  seconds: PropTypes.number,
  minutes: PropTypes.number
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  seconds: state.countdown.seconds,
  minutes: state.countdown.minutes
})

export default connect(mapStateToProps, { resetPasswordRequest, tick, resetCountdown })(ForgotPassword)

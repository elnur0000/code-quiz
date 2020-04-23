import React, { useState } from 'react'
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
import { register } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    emailHelper: '',
    password2Helper: '',
    passwordHelper: ''
  })
  const [isLoading, setLoading] = useState(false)

  const { name, email, password, password2, emailHelper, password2Helper, passwordHelper } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    let valid
    switch (e.target.name) {
      case 'email':
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
        if (!valid) {
          setFormData({ ...formData, email: e.target.value, emailHelper: 'Invalid email' })
        } else {
          setFormData({ ...formData, email: e.target.value, emailHelper: '' })
        }
        break
      case 'password2':
        if (password !== e.target.value) {
          setFormData({ ...formData, password2: e.target.value, password2Helper: 'Passwords do not match' })
        } else {
          setFormData({ ...formData, password2: e.target.value, password2Helper: '' })
        }
        break
      case 'password':
        if (e.target.value.length < 6) {
          setFormData({ ...formData, password: e.target.value, passwordHelper: 'Password should be minimum 6 characters' })
        } else {
          setFormData({ ...formData, password: e.target.value, passwordHelper: '' })
        }
        break
      default:
        break
    }
  }
  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await register({ name, email, password })
    setLoading(false)
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Name'
                value={name}
                onChange={e => onChange(e)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                error={!!emailHelper}
                helperText={emailHelper}
                value={email}
                autoComplete='email'
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                value={password}
                error={!!passwordHelper}
                helperText={passwordHelper}
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={e => onChange(e)}
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='password2'
                value={password2}
                label='Confirm Password'
                type='password'
                error={!!password2Helper}
                helperText={password2Helper}
                name='password2'
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <div className={classes.wrapper}>
            <Button
              type='submit'
              fullWidth
              disabled={Boolean(isLoading || !name || passwordHelper || password2Helper || emailHelper || !email || !password || !password2)}
              variant='contained'
              color='secondary'
              className={classes.submit}
            >
              {isLoading ? <CircularProgress color='secondary' size={24} className={classes.buttonProgress} /> : 'Sign Up'}
            </Button>
          </div>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register)

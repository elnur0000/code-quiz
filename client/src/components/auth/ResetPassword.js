import React, { useState } from 'react'
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Typography,
  Grid,
  makeStyles,
  CircularProgress
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link as Redirect, useHistory } from 'react-router-dom'
import { changePassword } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from '../layout/Alert'

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

const ResetPassword = ({ setAlert, changePassword, isAuthenticated, match, loading }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
    password2Helper: '',
    passwordHelper: ''
  })

  const { password, password2, password2Helper, passwordHelper } = formData

  const onChange = e => {
    switch (e.target.name) {
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
    changePassword(password, match.params.token)
    // useHistory().push('/login')
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Alert />
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

          <Button
            type='submit'
            fullWidth
            disabled={Boolean(loading || passwordHelper || password2Helper || !password || !password2)}
            variant='contained'
            color='secondary'
            className={classes.submit}
          >
            {loading ? <CircularProgress color='secondary' size={24} className={classes.buttonProgress} /> : 'Change'}
          </Button>

        </form>
      </div>
    </Container>

  )
}

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  })
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(
  mapStateToProps,
  { setAlert, changePassword }
)(ResetPassword)

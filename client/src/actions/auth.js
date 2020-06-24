import axios from 'axios'
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  AUTH_LOADING,
  COUNTDOWN_INIT
} from './types'
import { setAlert } from './alert'

export const register = ({ name, email, password }) => async dispatch => {
  dispatch({
    type: AUTH_LOADING
  })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/api/v1/auth/register', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    err.response.data
      ? dispatch(setAlert(err.response.data.error.message, 'error'))
      : dispatch(setAlert('something went wrong with a server', 'error'))

    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const loadUser = () => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  })
  try {
    const res = await axios.get('/api/v1/auth/me')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Login User
export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  })
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/v1/auth/login', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    dispatch(setAlert('incorrect email or password', 'error'))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const resetPasswordRequest = email => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  })
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email })

  try {
    const res = await axios.post('/api/v1/auth/forgotpassword', body, config)
    if (res.data.success) {
      dispatch(setAlert('Reset request successfully sent to your email', 'success'))
    } else {
      dispatch(setAlert('Wait for the countdown to end, so you can send another email', 'warning'))
    }
    dispatch({ type: COUNTDOWN_INIT, payload: new Date(res.data.lockedUntil) - Date.now() })
  } catch (err) {
    err.response.data
      ? dispatch(setAlert(err.response.data.error.message, 'error'))
      : dispatch(setAlert('something went wrong with a server', 'error'))
  }
}

export const changePassword = (password, resetToken) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  })
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ password })

  try {
    await axios.put(`/api/v1/auth/resetpassword/${resetToken}`, body, config)
    dispatch(setAlert('Password successfully changed', 'success'))
  } catch (err) {
    err.response.data
      ? dispatch(setAlert(err.response.data.error.message, 'error'))
      : dispatch(setAlert('something went wrong with a server', 'error'))
  }
}

export const logout = () => (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
}

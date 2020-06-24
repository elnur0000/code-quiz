import axios from 'axios'
import {
  GET_TESTS,
  GET_TEST,
  ADD_TEST,
  DELETE_TEST,
  TEST_INVITE
} from './types'
import { setAlert } from './alert'

export const getTests = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/tests')

    dispatch({
      type: GET_TESTS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const getTest = _id => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/tests/${_id}`)

    dispatch({
      type: GET_TEST,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const getTestByAccessToken = accessToken => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/tests/${accessToken}`)

    dispatch({
      type: GET_TEST,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const addTest = test => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/v1/tests', test, config)

    dispatch({
      type: ADD_TEST,
      payload: res.data
    })

    dispatch(setAlert('Test successfully created', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const deleteTest = _id => async dispatch => {
  try {
    await axios.delete(`/api/v1/tests/${_id}`)

    dispatch({
      type: DELETE_TEST,
      payload: _id
    })

    dispatch(setAlert('Test successfully deleted', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const inviteCandidate = (testId, candidate) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/v1/tests/${testId}/invite`, candidate, config)

    dispatch({
      type: TEST_INVITE,
      payload: res.data
    })

    dispatch(setAlert('Candidate/Candidates successfully invited', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

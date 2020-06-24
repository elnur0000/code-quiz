import axios from 'axios'
import {
  EDITOR_RUN,
  EDITOR_LOADING,
  EDITOR_SUBMIT
} from './types'
import { setAlert } from './alert'

export const runCode = (stdin, code, language) => async dispatch => {
  dispatch({
    type: EDITOR_LOADING
  })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ stdin, code, language })

  try {
    const res = await axios.post('/tests/run', body, config)
    dispatch({
      type: EDITOR_RUN,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const submitProblem = (problemId, code, language) => async dispatch => {
  dispatch({
    type: EDITOR_LOADING
  })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ code, language })

  try {
    const res = await axios.post(`/problems/${problemId}/submit`, body, config)
    dispatch({
      type: EDITOR_SUBMIT,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}
export const submitTest = (problemId, code, language, accessToken) => async dispatch => {
  dispatch({
    type: EDITOR_LOADING
  })

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ code, language, problemId })

  try {
    const res = await axios.post(`/tests/submit?accessToken=${accessToken}`, body, config)
    dispatch({
      type: EDITOR_SUBMIT,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

import axios from 'axios'
import {
  GET_PROBLEMS,
  ADD_PROBLEM,
  DELETE_PROBLEM,
  EDIT_PROBLEM,
  GET_PROBLEM,
  ADD_TESTCASE,
  EDIT_TESTCASE,
  DELETE_TESTCASE
} from './types'
import { setAlert } from './alert'

export const getProblems = () => async dispatch => {
  try {
    const res = await axios.get('/problems')

    dispatch({
      type: GET_PROBLEMS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const getProblem = _id => async dispatch => {
  try {
    const res = await axios.get(`/problems/${_id}`)

    dispatch({
      type: GET_PROBLEM,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const addProblem = problem => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/problems', problem, config)

    dispatch({
      type: ADD_PROBLEM,
      payload: res.data
    })

    dispatch(setAlert('Problem successfully created', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const deleteProblem = _id => async dispatch => {
  try {
    await axios.delete(`/problems/${_id}`)

    dispatch({
      type: DELETE_PROBLEM,
      payload: _id
    })

    dispatch(setAlert('Problem successfully deleted', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const editProblem = (_id, problem) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/problems/${_id}`, problem, config)

    dispatch({
      type: EDIT_PROBLEM,
      payload: res.data
    })

    dispatch(setAlert('Problem successfully edited', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const addTestcase = (problemId, testcase) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/problems/${problemId}/testcases`, testcase, config)

    dispatch({
      type: ADD_TESTCASE,
      payload: res.data
    })

    dispatch(setAlert('Testcase successfully created', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}
export const editTestcase = (problemId, testcase, testcaseId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/problems/${problemId}/testcases/${testcaseId}`, testcase, config)

    dispatch({
      type: EDIT_TESTCASE,
      payload: res.data
    })

    dispatch(setAlert('Testcase successfully edited', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const deleteTestcase = (problemId, testcaseId) => async dispatch => {
  try {
    const res = await axios.delete(`/problems/${problemId}/testcases/${testcaseId}`)

    dispatch({
      type: DELETE_TESTCASE,
      payload: res.data
    })

    dispatch(setAlert('Testcase successfully deleted', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

import axios from 'axios'
import {
  GET_PROBLEMS,
  PROBLEM_ERROR,
  ADD_PROBLEM,
  DELETE_PROBLEM,
  EDIT_PROBLEM
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

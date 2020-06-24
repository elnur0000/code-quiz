import axios from 'axios'
import {
  GET_GROUPS,
  GET_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
  EDIT_GROUP,
  GROUP_ADD_USER,
  GROUP_EDIT_USER,
  GROUP_DELETE_USER
} from './types'
import { setAlert } from './alert'

export const getGroups = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/groups')

    dispatch({
      type: GET_GROUPS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const getGroup = _id => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/groups/${_id}`)

    dispatch({
      type: GET_GROUP,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const addGroup = group => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/v1/groups', group, config)

    dispatch({
      type: ADD_GROUP,
      payload: res.data
    })

    dispatch(setAlert('Group successfully created', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const deleteGroup = _id => async dispatch => {
  try {
    await axios.delete(`/api/v1/groups/${_id}`)

    dispatch({
      type: DELETE_GROUP,
      payload: _id
    })

    dispatch(setAlert('Group successfully deleted', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const editGroup = (_id, group) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/v1/groups/${_id}`, group, config)

    dispatch({
      type: EDIT_GROUP,
      payload: res.data
    })

    dispatch(setAlert('Group successfully edited', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const addUser = (groupId, user) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/v1/groups/${groupId}/users`, user, config)

    dispatch({
      type: GROUP_ADD_USER,
      payload: res.data
    })

    dispatch(setAlert('User successfully added', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}
export const editUser = (groupId, user, userId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/v1/groups/${groupId}/users/${userId}`, user, config)

    dispatch({
      type: GROUP_EDIT_USER,
      payload: res.data
    })

    dispatch(setAlert('User successfully edited', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

export const deleteUser = (groupId, userId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/groups/${groupId}/users/${userId}`)

    dispatch({
      type: GROUP_DELETE_USER,
      payload: res.data
    })

    dispatch(setAlert('User successfully deleted from group', 'success'))
  } catch (err) {
    dispatch(setAlert((err.response && err.response.data && err.response.data.error.message) || 'something went wrong with a server', 'error'))
  }
}

import {
  GET_GROUPS,
  GROUP_ERROR,
  ADD_GROUP,
  DELETE_GROUP,
  EDIT_GROUP,
  GET_GROUP,
  GROUP_ADD_USER,
  GROUP_EDIT_USER,
  GROUP_DELETE_USER
} from '../actions/types'

const initialState = {
  groups: [],
  group: null,
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false
      }
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false
      }
    case ADD_GROUP:
      return {
        ...state,
        groups: [payload, ...state.groups],
        loading: false
      }
    case GROUP_ADD_USER:
      return {
        ...state,
        groups: state.groups.map(group => group._id === payload._id ? payload : group),
        loading: false
      }
    case GROUP_EDIT_USER:
      return {
        ...state,
        groups: state.groups.map(group => group._id === payload._id ? payload : group),
        loading: false
      }
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case EDIT_GROUP:
      return {
        ...state,
        groups: state.groups.map(group => group._id === payload._id ? payload : group),
        loading: false
      }
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group._id !== payload),
        loading: false
      }
    case GROUP_DELETE_USER:
      return {
        ...state,
        groups: state.groups.map(group => group._id === payload._id ? payload : group),
        loading: false
      }
    default:
      return state
  }
}

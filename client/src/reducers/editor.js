import {
  EDITOR_LOADING,
  EDITOR_RUN,
  EDITOR_SUBMIT
} from '../actions/types'

const initialState = {
  loading: false,
  result: null,
  submitted: false
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case EDITOR_LOADING:
      return {
        ...state,
        loading: true
      }
    case EDITOR_SUBMIT:
      return {
        ...state,
        loading: false,
        result: payload,
        submitted: true
      }
    case EDITOR_RUN:
      return {
        ...state,
        loading: false,
        submitted: false,
        result: payload
      }
    default:
      return state
  }
}

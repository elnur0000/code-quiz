import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

export default function (state = null, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ALERT:
      return payload
    case REMOVE_ALERT:
      return null
    default:
      return state
  }
}

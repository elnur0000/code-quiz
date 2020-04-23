import {
  COUNTDOWN_INIT,
  COUNTDOWN_DECREASE,
  COUNTDOWN_RESET
} from '../actions/types'

const initialState = {
  minutes: 0,
  seconds: 0
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case COUNTDOWN_INIT:
      return {
        ...state,
        seconds: Math.round(((payload % 60000) / 1000)),
        minutes: Math.floor(payload / 60000)
      }
    case COUNTDOWN_DECREASE:
      return {
        minutes: (state.seconds - payload) < 0 ? state.minutes - 1 : state.minutes,
        seconds: (state.seconds - payload) < 0 ? 60 - payload : state.seconds - payload
      }
    case COUNTDOWN_RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}

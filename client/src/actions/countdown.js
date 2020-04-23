import { COUNTDOWN_DECREASE, COUNTDOWN_RESET } from './types'

export const tick = () => dispatch => {
  dispatch({
    type: COUNTDOWN_DECREASE,
    payload: 1
  })
}

export const resetCountdown = () => dispatch => {
  dispatch({
    type: COUNTDOWN_RESET
  })
}

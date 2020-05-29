import {
  REGISTER_SUCCESS
} from '../actions/types'

const initialState = {
  fontSize: '18',
  tabSize: 2,
  mode: 'java',
  theme: 'github',
  error: null
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}

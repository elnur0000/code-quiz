import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import countdown from './countdown'

export default combineReducers({
  alert,
  auth,
  countdown
})

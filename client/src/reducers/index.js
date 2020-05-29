import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import countdown from './countdown'
import editor from './editor'

export default combineReducers({
  alert,
  auth,
  countdown,
  editor
})

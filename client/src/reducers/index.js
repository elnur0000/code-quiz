import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import countdown from './countdown'
import editor from './editor'
import problem from './problem'

export default combineReducers({
  alert,
  auth,
  countdown,
  editor,
  problem
})

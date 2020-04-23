import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import setAuthToken from './utils/setAuthToken'

const initialState = {}

const middleWare = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)

// prevent auth error on first run of subscription
let currentState = {
  auth: { token: null, isAuthenticated: null, loading: true, user: null }
}

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  const previousState = currentState
  currentState = store.getState()
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token
    setAuthToken(token)
  }
})

export default store

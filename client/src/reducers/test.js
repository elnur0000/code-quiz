import {
  GET_TESTS,
  ADD_TEST,
  DELETE_TEST,
  GET_TEST,
  TEST_INVITE,
  TEST_ERROR,
  NEW_REPORT
} from '../actions/types'

const initialState = {
  tests: [],
  test: null,
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_TESTS:
      return {
        ...state,
        tests: payload,
        loading: false
      }
    case GET_TEST:
      return {
        ...state,
        test: payload,
        loading: false
      }
    case TEST_INVITE:
      return {
        ...state,
        tests: state.tests.map(test => test._id === payload._id ? payload : test),
        loading: false
      }
    case ADD_TEST:
      return {
        ...state,
        tests: [payload, ...state.tests],
        loading: false
      }
    case TEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case DELETE_TEST:
      return {
        ...state,
        tests: state.tests.filter(test => test._id !== payload),
        loading: false
      }
    case NEW_REPORT:
      return {
        ...state,
        tests: state.tests.map(test => test._id === payload.testId ? { ...test, reports: [...(test.reports || []), payload.msg] } : test)
      }
    default:
      return state
  }
}

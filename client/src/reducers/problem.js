import {
  GET_PROBLEMS,
  PROBLEM_ERROR,
  ADD_PROBLEM,
  DELETE_PROBLEM,
  EDIT_PROBLEM,
  GET_PROBLEM,
  ADD_TESTCASE,
  EDIT_TESTCASE,
  DELETE_TESTCASE
} from '../actions/types'

const initialState = {
  problems: [],
  problem: null,
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PROBLEMS:
      return {
        ...state,
        problems: payload,
        loading: false
      }
    case GET_PROBLEM:
      return {
        ...state,
        problem: payload,
        loading: false
      }
    case ADD_PROBLEM:
      return {
        ...state,
        problems: [payload, ...state.problems],
        loading: false
      }
    case ADD_TESTCASE:
      return {
        ...state,
        problems: state.problems.map(problem => problem._id === payload._id ? payload : problem),
        loading: false
      }
    case EDIT_TESTCASE:
      return {
        ...state,
        problems: state.problems.map(problem => problem._id === payload._id ? payload : problem),
        loading: false
      }
    case PROBLEM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case EDIT_PROBLEM:
      return {
        ...state,
        problems: state.problems.map(problem => problem._id === payload._id ? payload : problem),
        loading: false
      }
    case DELETE_PROBLEM:
      return {
        ...state,
        problems: state.problems.filter(problem => problem._id !== payload),
        loading: false
      }
    case DELETE_TESTCASE:
      return {
        ...state,
        problems: state.problems.map(problem => problem._id === payload._id ? payload : problem),
        loading: false
      }
    default:
      return state
  }
}

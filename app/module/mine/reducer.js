import * as constants from './constant'

export function userReducer(state = {}, action) {
  let user = null
  switch (action.type) {
    case constants.REQUEST_USER:
      return {
        ...state,
        userFetching: true
      }
    case constants.RESPONSE_USER:
      return {
        ...state,
        userFetching: false,
        userFetched: action.payload.success,
        user: action.payload.data
      }
    case constants.CLEAR_USER:
      return {
        ...state,
        user: null,
        userClean: true
      }
    default:
      return state
  }
}

export function cacheReducer(state = {}, action) {
  switch (action.type) {
    case constants.START_ERASECACHE:
      return {
        ...state,
        cacheErasing: true
      }
    case constants.FINISH_ERASECACHE:
      return {
        ...state,
        cacheErasing: false,
        cacheErased: true
      }
    default:
      return state
  }
}

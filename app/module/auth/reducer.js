import * as constants from './constant'

export function authReducer(
  state = {
    auth: { isLogined: false }
  },
  action
) {
  let auth = { ...state.auth }
  switch (action.type) {
    case constants.START_LOGIN:
      return {
        ...state,
        isLogining: true
      }
    case constants.FINISH_LOGIN:
      if (action.payload.ret.success) {
        auth = {
          isLogined: true,
          username: action.payload.ret.loginname,
          accessToken: action.payload.token
        }
      }
      return {
        ...state,
        isLogining: false,
        isLogined: action.payload.ret.success,
        auth
      }
    case constants.REQUEST_AUTH:
      return {
        ...state,
        authFetching: true,
        authFetched: false
      }
    case constants.RESPONSE_AUTH:
      if (action.ret) {
        auth = action.payload
      }
      return {
        ...state,
        authFetched: true,
        authFetching: false,
        auth
      }
    case constants.START_SAVEAUTH:
      return {
        ...state,
        authSaving: true
      }
    case constants.FINISH_SAVEAUTH:
      return {
        ...state,
        auth: action.payload,
        authSaving: false,
        authSaved: true
      }
    default:
      return state
  }
}

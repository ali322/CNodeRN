import * as constants from "./constant"

export function authReducer(state = {}, action) {
    let user = null
    switch (action.type) {
        case constants.START_LOGIN:
            return {
                ...state,
                isLogining: true
            }
        case constants.FINISH_LOGIN:
            if (action.payload.ret.success) {
                user = {
                    username: action.payload.ret.loginname,
                    accessToken: action.payload.token
                }
            }
            return {
                ...state,
                isLogining: false,
                isLogined: action.payload.ret.success,
                user
            }
        case constants.REQUEST_AUTH:
            return {
                ...state,
                authFetching: true,
                authFetched: false
            }
        case constants.RESPONSE_AUTH:
            return {
                ...state,
                authFetched: true,
                authFetching: false,
                auth: action.ret
            }
        case constants.START_SAVEAUTH:
            return {
                ...state,
                authSaving: true
            }
        case constants.FINISH_SAVEAUTH:
            return {
                ...state,
                auth: action.ret,
                authSaving: false,
                authSaved: true
            }
        default:
            return state
    }
}
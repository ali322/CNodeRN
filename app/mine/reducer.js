'use strict'

import * as constants from "./constant"


export function userReducer(state={},action){
    switch(action.type){
        case constants.START_AUTHORIZE:
            return {
                ...state,
                isAuthorizing:true
            }
        case constants.FINISH_AUTHORIZE:
            return {
                ...state,
                isAuthorizing:false,
                isAuthorized:action.ret.success,
                username:action.ret.loginname
            }
        case constants.REQUEST_USER:
            return {
                ...state,
                userFetching:true
            }
        case constants.RESPONSE_USER:
            return {
                ...state,
                userFetching:false,
                userFetched:action.ret.success,
                user:action.ret.data
            }
        default:
            return state
    }
}
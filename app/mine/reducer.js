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
            let user = null
            if(action.ret.success){
                user = {
                    username:action.ret.loginname,
                    accessToken:action.accessToken
                }
            }
            return {
                ...state,
                isAuthorizing:false,
                isAuthorized:action.ret.success,
                user
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
        case constants.CLEAR_USER:
            return {
                ...state,
                user:null,
                userClean:true
            }
        default:
            return state
    }
}
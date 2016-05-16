'use strict'

import * as constants from "./constant"

export function authorizeReducer(state={},action){
    let user = null
    switch(action.type){
        case constants.START_AUTHORIZE:
            return {
                ...state,
                isAuthorizing:true
            }
        case constants.FINISH_AUTHORIZE:
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
        default:
            return state
    }
}
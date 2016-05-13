'use strict'

import * as constants from "./constant"

export function collectReducer(state={},action){
    switch(action.type){
        case constants.REQUEST_USERCOLLECT:
            return {
                ...state,
                collectFetching:true
            }
        case constants.RESPONSE_USERCOLLECT:
            return {
                ...state,
                collectFetching:false,
                collectFetched:action.ret.success,
                collects:action.ret.data
            }
        default:
            return state
    }
}
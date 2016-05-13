'use strict'

import  * as constants from "./constant"

export function messageCountReducer(state={},action){
    switch(action.type){
        case constants.REQUEST_MESSAGECOUNT:
            return {
                ...state,
                messageCountFetching: true
            }
        case constants.RESPONSE_MESSAGECOUNT:
            return {
                ...state,
                messageCountFetching: false,
                count: action.ret.data,
                messageCountFetched: action.ret.success
            }
        default:
            return state
    }
}
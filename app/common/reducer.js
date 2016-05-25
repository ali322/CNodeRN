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

export function userPrefsReducer(state={},action){
    switch(action.type){
        case constants.START_SAVEUSERPREFS:
            return {
                ...state,
                userPrefsSaving:true
            }
        case constants.FINISH_SAVEUSERPREFS:
            return {
                ...state,
                userPrefs:action.ret,
                userPrefsSaving:false,
                userPrefsSaved:true
            }
        case constants.REQUEST_USERPREFS:
            return {
                ...state,
                userPrefsFetching:true
            }
        case constants.RESPONSE_USERPREFS:
            return {
                ...state,
                userPrefsFetching:false,
                userPrefsFetched:true,
                userPrefs:action.ret
            }
        default:
            return state
    }
}
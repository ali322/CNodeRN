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

export function userPrefsReducer(state={
    userPrefs:{
        preferredFontSize:14
    }
},action){
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
                userPrefs:action.ret?action.ret:{
                    preferredTheme:"light"
                }
            }
        default:
            return state
    }
}

export function authenticationReducer(state={},action){
    switch (action.type) {
        case constants.REQUEST_AUTHENTICATION:
            return {
                ...state,
                authenticationFetching:true,
                authenticationFetched:false
            }
        case constants.RESPONSE_AUTHENTICATION:
            return {
                ...state,
                authenticationFetched:true,
                authenticationFetching:false,
                authentication:action.ret
            }
        case constants.START_SAVEAUTHENTICATION:
            return {
                ...state,
                authenticationSaving:true
            }
        case constants.FINISH_SAVEAUTHENTICATION:
            return {
                ...state,
                authentication:action.ret,
                authenticationSaving:false,
                authenticationSaved:true
            }
        default:
            return state
    }
}
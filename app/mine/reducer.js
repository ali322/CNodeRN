'use strict'

import {combineReducers} from "redux"
import * as constants from "./constant"
import {userPrefsReducer} from "../common/reducer"

export function userReducer(state={},action){
    let user = null
    switch(action.type){
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

export default combineReducers({
    userReducer,
    userPrefsReducer
})
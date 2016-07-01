'use strict'
import * as constants from "./constant"

import api from "../lib/api"
import request from "../lib/request"

function requestUser(){
    return {
        type:constants.REQUEST_USER
    }
}

function responseUser(ret){
    return {
        type:constants.RESPONSE_USER,
        ret,
        respondAt:Date.now()
    }
}

export function fetchUser(username){
    return (dispatch)=>{
        dispatch(requestUser())
        fetch(`${api.user}/${username}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseUser(ret))
        })
    }
}

export function clearUser(){
    return {
        type:constants.CLEAR_USER
    }
}

export {fetchUserPrefs,saveUserPrefs} from "../common/action"

function startEraseCache(){
    return {
        type:constants.START_ERASECACHE
    }
}

function finishEraseCache(){
    return {
        type:constants.FINISH_ERASECACHE,
        finishAt:Date.now()
    }
}

export function eraseCache(){
    return dispatch=>{
        dispatch(startEraseCache())
        global.storage.getAllKeys().then(keys=>{
            global.storage.multiRemove(keys.filter(key=>key.startsWith("cache."))).then(err=>{
                dispatch(finishEraseCache())
            })
        })
    }
}
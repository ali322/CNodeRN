import * as constants from "./constant"

import { request } from '../../lib/'
import api from '../../lib/api'

function requestUser(){
    return {
        type:constants.REQUEST_USER
    }
}

function responseUser(payload){
    return {
        type:constants.RESPONSE_USER,
        payload,
        respondAt:Date.now()
    }
}

export function fetchUser(username){
    return (dispatch)=>{
        dispatch(requestUser())
        request.get(`${api.user}/${username}`).then((ret)=>{
            dispatch(responseUser(ret.data))
        }).catch(err=>{
            console.log(err)
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
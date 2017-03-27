import * as constants from "./constant"

import { request } from '../../lib/'
import api from '../../lib/api'

function startLogin(){
    return {
        type:constants.START_LOGIN
    }
}

function finishLogin(payload){
    return {
        type:constants.FINISH_LOGIN,
        payload,
        finishAt:Date.now()
   }
}

export function login(token){
    return (dispatch)=>{
        dispatch(startLogin())
        request.post(`${api.authorize}`,{accesstoken:token}).then((ret)=>{
            dispatch(finishLogin({ret,token}))
        })
    }
}

function requestAuth() {
    return {
        type:constants.REQUEST_AUTH
    }
}

function responseAuth(ret){
    return {
        type:constants.RESPONSE_AUTH,
        ret,
        respondAt:Date.now()
    }
}

export function fetchAuth(){
    return dispatch=>{
        dispatch(requestAuth())
        global.storage.getItem("user").then(ret=>{
            dispatch(responseAuth(ret))
        })
    }
}

function startSaveAuth() {
    return {
        type:constants.START_SAVEAUTH
    }
}

function finishSaveAuth(ret){
    return {
        type:constants.FINISH_SAVEAUTH,
        ret,
        finishAt:Date.now()
    }
}

export function saveAuth(user){
    return dispatch=>{
        dispatch(startSaveAuth())
        global.storage.setItem("user",user).then(ret=>{
            dispatch(finishSaveAuth(user))
        })
    }
}
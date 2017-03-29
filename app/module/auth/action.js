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
        }).catch(err=>{
            // console.log(err)
        })
    }
}

function requestAuth() {
    return {
        type:constants.REQUEST_AUTH
    }
}

function responseAuth(payload){
    return {
        type:constants.RESPONSE_AUTH,
        payload,
        respondAt:Date.now()
    }
}

export function fetchAuth(){
    return dispatch=>{
        dispatch(requestAuth())
        global.storage.getItem("auth").then(ret=>{
            dispatch(responseAuth(ret))
        })
    }
}

function startSaveAuth() {
    return {
        type:constants.START_SAVEAUTH
    }
}

function finishSaveAuth(payload){
    return {
        type:constants.FINISH_SAVEAUTH,
        payload,
        finishAt:Date.now()
    }
}

export function saveAuth(auth){
    return dispatch=>{
        dispatch(startSaveAuth())
        global.storage.setItem("auth",auth).then(ret=>{
            dispatch(finishSaveAuth(auth))
        })
    }
}
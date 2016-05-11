'use strict'

import * as constants from "./constant"

import api from "../lib/api"
import {Alert} from "react-native"


function startAuthorize(){
    return {
        type:constants.START_AUTHORIZE
    }
}

function finishAuthorize(ret,accessToken){
    return {
        type:constants.FINISH_AUTHORIZE,
        ret,
        accessToken,
        finishAt:Date.now()
   }
}

export function authorizeByToken(token){
    return (dispatch)=>{
        dispatch(startAuthorize())
        let formdata = JSON.stringify({accesstoken:token})
        fetch(`${api.authorize}`,{method:"POST",body:formdata,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((ret)=>ret.json()).then((ret)=>{
            dispatch(finishAuthorize(ret,token))
        })
    }
}

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
'use strict'

import * as constants from "./constant"

import api from "../lib/api"
import {Alert} from "react-native"

function startAuthorize(){
    return {
        type:constants.START_AUTHORIZE
    }
}

function finishAuthorize(ret){
    return {
        type:constants.FINISH_AUTHORIZE,
        ret,
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
            dispatch(finishAuthorize(ret))
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
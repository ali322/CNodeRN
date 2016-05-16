'use strict'

import * as constants from "./constant"

import api from "../lib/api"
import request from "../lib/request"

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
        request.post(`${api.authorize}`,{accesstoken:token}).then((ret)=>{
            dispatch(finishAuthorize(ret,token))
        })
    }
}
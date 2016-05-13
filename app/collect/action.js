'use strict'

import * as constants from "./constant"

import request from "../lib/request"
import api from "../lib/api"

function requestUserCollect(){
    return {
        type:constants.REQUEST_USERCOLLECT
    }
}

function responseUserCollect(ret){
    return {
        type:constants.RESPONSE_USERCOLLECT,
        ret,
        respondAt:Date.now()
    }
}

export function fetchUserCollect(username){
    return dispatch=>{
        dispatch(requestUserCollect())
        request.get(`${api.userCollect}/${username}`).then((ret)=>{
            dispatch(responseUserCollect(ret))
        })
    }
}
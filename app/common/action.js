'use strict'

import * as constants from "./constant"
import request from "../lib/request"
import api from "../lib/api"

function requestMessageCount(){
    return {
        type:constants.REQUEST_MESSAGECOUNT
    }
}

function responseMessageCount(ret){
    return {
        type:constants.RESPONSE_MESSAGECOUNT,
        ret,
        respondAt:Date.now()
    }
}

export function fetchMessageCount(accessToken){
    return (dispatch)=>{
        dispatch(requestMessageCount())
        fetch(`${api.messageCount}?accesstoken=${accessToken}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseMessageCount(ret))
        })
    }
}
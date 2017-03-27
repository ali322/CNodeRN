import * as constants from "./constant"

import { request } from '../../lib/'
import api from '../../lib/api'

function requestMessages(){
    return {
        type:constants.REQUEST_MESSAGES
    }
}

function responseMessages(payload){
    return {
        type:constants.RESPONSE_MESSAGES,
        payload,
        respondAt:Date.now()
    }
}

export function fetchMessages(accesstoken){
    return (dispatch)=>{
        dispatch(requestMessages())
        request.get(`${api.messages}?accesstoken=${accesstoken}`).then((ret)=>{
            dispatch(responseMessages(ret.data))
        })
    }
}

function startMarkAllMessage(){
    return {
        type:constants.START_MARKALLMESSAGE
    }
}

function finishMarkAllMessage(payload){
    return {
        type:constants.FINISH_MARKALLMESSAGE,
        payload
    }
}

export function MarkAllMessage(accesstoken){
    return (dispatch)=>{
        dispatch(startMarkAllMessage())
        request.post(`${api.markAllMessage}`,{accesstoken}).then(ret=>{
            dispatch(finishMarkAllMessage(ret.data))
        })
    }
}
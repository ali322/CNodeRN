'use strict'

import * as constants from "./constant"
import api from "../lib/api"

function requestMessages(){
    return {
        type:constants.REQUEST_MESSAGES
    }
}

function responseMessages(ret){
    return {
        type:constants.RESPONSE_MESSAGES,
        ret,
        respondAt:Date.now()
    }
}

export function fetchMessages(accesstoken){
    return (dispatch)=>{
        dispatch(requestMessages())
        fetch(`${api.messages}?accesstoken=${accesstoken}`).then((ret)=>ret.json()).then((ret)=>{
            dispatch(responseMessages(ret))
        })
    }
}

function startMarkAllMessage(){
    return {
        type:constants.START_MARKALLMESSAGE
    }
}

function finishMarkAllMessage(ret){
    return {
        type:constants.FINISH_MARKALLMESSAGE,
        ret
    }
}

export function MarkAllMessage(accesstoken){
    return (dispatch)=>{
        dispatch(startMarkAllMessage())
        let formdata = new FormData()
        formdata.append("accesstoken",accesstoken)
        fetch(`${api.markAllMessage}`,{method:"POST",body:formdata}).then((ret)=>ret.json()).then((ret)=>{
            dispatch(finishMarkAllMessage(ret))
        })
    }
}
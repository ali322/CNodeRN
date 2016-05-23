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

function requestUserPrefs() {
    return {
        type:constants.REQUEST_USERPREFS
    }
}

function responseUserPrefs(ret){
    return {
        type:constants.RESPONSE_USERPREFS,
        ret,
        respondAt:Date.now()
    }
}

export function fetchUserPrefs(){
    return dispatch=>{
        dispatch(requestUserPrefs())
        global.storage.getItem("userPrefs").then((ret)=>{
            dispatch(responseUserPrefs(ret))
        })
    }
}

function startSaveUserPrefs(){
    return {
        type:constants.START_SAVEUSERPREFS
    }
}

function finishSaveUserPrefs(ret){
    return {
        type:constants.FINISH_SAVEUSERPREFS,
        ret,
        finishAt:Date.now()
    }
}

export function saveUserPrefs(userPrefs){
    return dispatch=>{
        dispatch(startSaveUserPrefs())
        global.storage.setItem("userPrefs",userPrefs).then((err)=>{
            dispatch(finishSaveUserPrefs(userPrefs))
        })
    }
}
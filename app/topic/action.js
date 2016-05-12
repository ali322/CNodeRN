'use strict'

import {
    REQUEST_TOPICS,RESPONSE_TOPICS,
    REQUEST_TOPIC,RESPONSE_TOPIC,
    CHANGE_CATEGORY,FILTER_TOPICS,
    START_SAVEREPLY,FINISH_SAVEREPLY
} from "./constant"

import api from "../lib/api"
import request from "../lib/request"

function requestTopics(category,pageIndex) {
    return {
        type:REQUEST_TOPICS,
        category,pageIndex
    }
}

function responseTopics(ret,category,pageIndex) {
    return {
        type:RESPONSE_TOPICS,
        ret,
        category,pageIndex
    }
}

export function fetchTopics(category="",pageIndex=1,pageSize=10) {
    return (dispatch)=>{
        dispatch(requestTopics(category,pageIndex))
        fetch(`${api.topics}?tab=${category}&page=${pageIndex}&limit=${pageSize}`).then(ret=>ret.json())
        .then((ret)=>{
            dispatch(responseTopics(ret,category,pageIndex))
        })
    }
}

export function changeCategory(category){
    return {
        type:CHANGE_CATEGORY,
        category
    }
}

export function filterTopics(keyword){
    return {
        type:FILTER_TOPICS,
        keyword
    }   
}


function requestTopic(id) {
    return {
        type:REQUEST_TOPIC,
        id
    }
}

function responseTopic(ret,id) {
    return {
        type:RESPONSE_TOPIC,
        ret,
        id
    }
}

export function fetchTopic(id) {
    return (dispatch)=>{
        dispatch(requestTopic(id))
        fetch(`${api.topic}/${id}`).then(ret=>ret.json())
        .then((ret)=>{
            dispatch(responseTopic(ret,id))
        })
    }
}

function startSaveReply(){
    return {
        type:START_SAVEREPLY
    }
}

function finishSaveReply(ret){
    return {
        type:FINISH_SAVEREPLY,
        ret
    }
}

export function saveReply(id,reply){
    return (dispatch)=>{
        dispatch(startSaveReply())
        request.post(`${api.reply2topic}/${id}/replies`,reply).then((ret)=>{
            console.log('ret',ret)
            dispatch(finishSaveReply(ret))
        })
    }
}
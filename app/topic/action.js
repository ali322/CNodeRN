'use strict'

import {
    REQUEST_TOPICS,RESPONSE_TOPICS,
    CHANGE_CATEGORY,FILTER_TOPICS
} from "./constant"

import api from "../lib/api"

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
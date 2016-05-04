'use strict'

import {
    REQUEST_TOPICS,RESPONSE_TOPICS
} from "./constant"

export function topicsReducer(state={},action) {
    switch(action.type){
        case REQUEST_TOPICS:
            return Object.assign({},state,{
                topicsFetching:true
            })
        case RESPONSE_TOPICS:
            return Object.assign({},state,{
                topicsFetching:false,
                topicsFetched:action.ret.success,
                pageIndex:action.pageIndex,
                list:[].concat(state.list,action.ret.data)
            })
        default:
            return state
    }
}
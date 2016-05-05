'use strict'

import {
    REQUEST_TOPICS,RESPONSE_TOPICS,
    CHANGE_CATEGORY,FILTER_TOPICS
} from "./constant"

import {fromNow} from "../lib/helper"


const initialState = {
    selectedCategory:"",
    categories:{
        "":{
            name:"全部",
            pageIndex:1,
            list:[]
        },
        "good":{
            name:"精华",
            pageIndex:1,
            list:[]
        },
        "share":{
            name:"分享",
            pageIndex:1,
            list:[]
        },
        "job":{
            name:"招聘",
            pageIndex:1,
            list:[]
        }
    }
}

export function topicsReducer(state= initialState,action) {
    let categories = {...state.categories}
    switch(action.type){
        case CHANGE_CATEGORY:
            return {
                ...state,
                selectedCategory:action.category
            }
        case FILTER_TOPICS:
            Object.keys(categories).map((category)=>{
                if(category === state.selectedCategory){
                    categories[category].list = categories[category].list.filter((v)=>{
                        return v.title.indexOf(action.keyword) > -1
                    })
                }
            })
            return {
                ...state,
                categories
            }
        case REQUEST_TOPICS:
            return {
                ...state,
                topicsFetching:true
            }
        case RESPONSE_TOPICS:
            Object.keys(categories).map((category)=>{
                if(category === state.selectedCategory){
                    categories[category].list = [].concat(categories[category].list,action.ret.data.map((v)=>{
                        v.create_at = fromNow(v.create_at)
                        return v
                    }))
                    categories[category].pageIndex = action.pageIndex
                }
            })
            return {
                ...state,
                topicsFetching:false,
                topicsFetched:action.ret.success,
                categories
            }
        default:
            return state
    }
}
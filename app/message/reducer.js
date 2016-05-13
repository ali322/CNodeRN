'use strict'

import * as constants from "./constant"

import {fromNow} from "../lib/helper"

export function messageReducer(state = {}, action) {
    switch (action.type) {
        case constants.REQUEST_MESSAGES:
            return {
                ...state,
                messagesFetching: true
            }
        case constants.RESPONSE_MESSAGES:
            let messages = {...action.ret.data}
            messages["has_read_messages"] = messages["has_read_messages"].map((message)=>{
                message["create_at"] = fromNow(message["create_at"])
                return message
            })
            messages["hasnot_read_messages"] = messages["hasnot_read_messages"].map((message)=>{
                message["create_at"] = fromNow(message["create_at"])
                return message
            })
            return {
                    ...state,
                messages,
                messagesFetched: action.ret.success,
                messagesFetching: false
            }
        case constants.START_MARKALLMESSAGE:
            return {
                ...state,
                markAllMessageSaving: true
            }
        case constants.FINISH_MARKALLMESSAGE:
            return {
                ...state,
                markAllMessageSaving: false,
                markAllMessageSaved: action.ret.success,
                messageIDs: action.ret.marked_msgs
            }
        default:
            return state
    }
}
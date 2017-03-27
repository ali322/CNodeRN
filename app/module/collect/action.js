import * as constants from "./constant"

import { request } from '../../lib/'
import api from '../../lib/api'

function requestCollect(){
    return {
        type:constants.REQUEST_COLLECT
    }
}

function responseCollect(payload){
    return {
        type:constants.RESPONSE_COLLECT,
        payload,
        respondAt:Date.now()
    }
}

export function fetchCollect(username){
    return dispatch=>{
        dispatch(requestCollect())
        request.get(`${api.userCollect}/${username}`).then((ret)=>{
            dispatch(responseCollect(ret.data))
        }).catch(err=>{
            console.log(err)
        })
    }
}
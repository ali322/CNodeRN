'use strict'
import * as constants from "./constant"

export function pushScene(scenes,key,params){
    return {
        type:constants.PUSH_SCENE,
        scenes,
        key,
        params
    }
}

export function popScene(scenes,key){
    return {
        type:constants.POP_SCENE,
        scenes,
        key
    }
}

export function jumpToScene(scenes,key,params){
    return {
        type:constants.JUMPTO_SCENE,
        scenes,
        key,
        params
    }
}

export function resetScene(index,children){
    return {
        type:constants.RESET_SCENE,
        index,
        children
    }
}
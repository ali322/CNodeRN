'use strict'
import * as constants from "./constant"

export function pushScene(sceneKey,params){
    return {
        type:constants.PUSH_SCENE,
        state:{key:sceneKey,title:sceneKey,params}
    }
}

export function popScene(key){
    return {
        type:constants.POP_SCENE,
        key
    }
}

export function jumpToScene(key,params){
    return {
        type:constants.JUMPTO_SCENE,
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
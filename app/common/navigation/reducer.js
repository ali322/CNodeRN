'use strict'
import {NavigationExperimental} from "react-native"
import * as constants from "./constant"

const {
    StateUtils:NavigationStateUtils
} = NavigationExperimental

function navigationReducer(state={},action) {
    switch(action.type){
        case constants.PUSH_SCENE:
            if(state.children[state.index].key === (action.state && action.state.key)){
                return state
            }
            return NavigationStateUtils.push(state,action.state)
        case constants.POP_SCENE:
            if(state.index === 0 || state.children.length === 1){
                return state
            }
            return NavigationStateUtils.pop(state)
        case constants.JUMPTO_SCENE:
            if(typeof action.key === "string"){
                return NavigationStateUtils.jumpTo(state,action.key)
            }
            return NavigationStateUtils.jumpToIndex(state,action.key)
        case constants.RESET_SCENE:
            return {
                ...state,
                index:action.index,
                children:action.children
            }
        default:
            return state
    }
}

export default function routerReducer(state={},action){
    const {navigationState,scenesMap} = state
    switch(action.type){
        case constants.PUSH_SCENE:
            const injectedAction = Object.assign({},action,{
                state:{
                    ...action.state,
                    ...scenesMap[action.state.key]
                }
            })
            // console.log("injectedAction",injectedAction,scenesMap[action.state.key])
            return {
                scenesMap,
                navigationState:navigationReducer(navigationState,injectedAction)
            }
        case constants.POP_SCENE:
        case constants.JUMPTO_SCENE:
        case constants.RESET_SCENE:
            return {
                scenesMap,
                navigationState:navigationReducer(navigationState,action)
            }
        default:
            return state
    }
}
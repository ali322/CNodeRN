'use strict'
import {NavigationExperimental} from "react-native"
import * as constants from "./constant"

const {
    StateUtils:NavigationStateUtils
} = NavigationExperimental

export function navigationReducer(state={},action) {
    const {navigationState,scenesMap} = state
    switch(action.type){
        case constants.PUSH_SCENE:
            if(navigationState.children[navigationState.index].key === (action.state && action.state.key)){
                return state
            }
            return {
                ...state,
                navigationState:NavigationStateUtils.push(navigationState,
                    Object.assign({},action.state,scenesMap[action.state.key]))
            }
        case constants.POP_SCENE:
            if(navigationState.index === 0 || navigationState.children.length === 1){
                return state
            }
            return {
                ...state,
                navigationState:NavigationStateUtils.pop(navigationState)
            }
        case constants.JUMPTO_SCENE:
            if(typeof action.key === "string"){
                return {...state,navigationState:NavigationStateUtils.jumpTo(navigationState,action.key)}
            }
            return {...state,navigationState:NavigationStateUtils.jumpToIndex(navigationState,action.key)}
        case constants.RESET_SCENE:
            return {
                    ...state,
                    navigationState:{
                        ...navigationState,
                        index:action.index,
                        children:action.children
                    }
                }
        default:
            return state
    }
}
'use strict'
import {NavigationExperimental} from "react-native"
import * as constants from "./constant"

const {
    StateUtils:NavigationStateUtils
} = NavigationExperimental

const initialState = {
    key:"navigation",
    index:0,
    children:[
        {key:"first",title:"First"}
    ]
}

export function navigationReducer(state=initialState,action) {
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
'use strict'
import {NavigationExperimental} from "react-native"
import * as constants from "./constant"
import _ from "lodash"

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
    const {navigationState,scenes} = state
    let _navigationState = _.cloneDeep(navigationState)
    let _scenes = _.cloneDeep(scenes)
    const {scene,path} = locateScene(_scenes,action.key)
    if(!scene){
        return state
    }
    function nestReducer(navState,navAction,scenePath){
        return scenePath?_.update(navState,scenePath,navSubState=>navigationReducer(navSubState,navAction)):
            navigationReducer(navState,navAction)
    }
    switch(action.type){
        case constants.PUSH_SCENE:
            if(scene.tabbar){
                scene.children = scene.children.map((item,i)=>{
                    return {
                        index:0,
                        ...item,
                        children:[item.children[0]]
                    }
                })
            }
            const injectedAction = {
                type:action.type,
                state:{
                    key:action.key,
                    params:action.params,
                    ...scene
                }
            }
            _navigationState = nestReducer(_navigationState,injectedAction,path)
            break
        case constants.POP_SCENE:
        case constants.JUMPTO_SCENE:
        case constants.RESET_SCENE:
            _navigationState = nestReducer(_navigationState,action,path)
            break
    }
    return {
        scenes,
        navigationState:_navigationState
    }
}

function locateScene(scenes,key,path="") {
    let _scene = null
    if(key){
        _.each(scenes,(scene,i)=>{
            if(scene.key === key){
                _scene = {scene,path}
                return false
            }
            if(scene.tabbar){
                _.each(scene.children,(item,j)=>{
                    _scene = locateScene(item.children,key,`${path}children[${i}]children[${j}]`)
                    if(_scene){
                        return false
                    }
                })
            }
        })
    }
    return _scene || {}
}
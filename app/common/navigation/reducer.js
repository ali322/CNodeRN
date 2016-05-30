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
    const {navigationState,scenesMap} = state
    let _navigationState = _.cloneDeep(navigationState)
    switch(action.type){
        case constants.PUSH_SCENE:
            const {scene,path} = rootPath(scenesMap,action.state.key)
            let _scene = _.cloneDeep(scene)
            if(_scene.tabbar){
                _scene.items = _scene.items.map((item,i)=>{
                    return {
                        index:0,
                        ...item,
                        children:[item.children[0]]
                    }
                })
            }
            const injectedAction = Object.assign({},action,{
                state:{
                    ...action.state,
                    ..._scene
                }
            })
            // const nestNavigationState = _.get(navigationState,"children[2]items[0]")
            if(path){
                _.update(_navigationState,path,(nestNavigationState)=>{
                    return navigationReducer(nestNavigationState,injectedAction)
                })
            }else{
                _navigationState = navigationReducer(_navigationState,injectedAction)
            }
            // console.log("injectedAction",injectedAction,scenesMap[action.state.key])
            return {
                scenesMap,
                navigationState:_navigationState
            }
        case constants.POP_SCENE:
            if(action.key){
                const {scene,path} = rootPath(scenesMap,action.key)
                let _scene = _.cloneDeep(scene)
                if(path){
                    _.update(_navigationState,path,(nestNavigationState)=>{
                        return navigationReducer(nestNavigationState,action)
                    })
                }else{
                    _navigationState = navigationReducer(_navigationState,action)
                }
            }else{
                _navigationState = navigationReducer(_navigationState,action)
            }
            return {
                scenesMap,
                navigationState:_navigationState
            }
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

function rootPath(scenesMap,key,path="") {
    let _scene = null
    _.each(scenesMap,(scene,i)=>{
        if(scene.key === key){
            _scene = {scene,path}
            return false
        }
        if(scene.tabbar){
            _.each(scene.items,(item,j)=>{
                _scene = rootPath(item.children,key,`${path}children[${i}]items[${j}]`)
                if(_scene){
                    // _scene.path = `children[i]items[j]`
                    return false
                }
            })
        }
    })
    console.log("scene",_scene)
    return _scene
}
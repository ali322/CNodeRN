'use strict'

import {NavigationExperimental} from "react-native"
import * as constants from "./constant"
import Immutable from "seamless-immutable"

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
            return state.update("children",children=>{
                return children.map((child,i)=>{
                    return {
                        ...child,
                        _mark:Date.now()
                    }
                })
            })
        default:
            return state
    }
}

let initialState = Immutable({
    index:0,
    current:{},
    key:"root",
    children:[]
})
    
export default function routerReducer(navigationState=initialState,action){
    if(!Immutable.isImmutable(navigationState)){
        navigationState = Immutable.from(navigationState)
    }
    let scene,path
    if(action.type === constants.PUSH_SCENE || action.type === constants.JUMPTO_SCENE){
        const locatedScene = locateScene(action.scenes,action.key) || {}
        scene = locatedScene.scene;path = locatedScene.path
        if(!scene){
            return navigationState
        }
        if(navigationState.children.length === 0){
            let initialScene = scene
            if(scene.tabbar){
                initialScene = scene.set("children",scene.children.map((item,i)=>{
                    return {
                        index:0,
                        ...item,
                        children:[item.children[0]]
                    }
                }))
            }
            navigationState = navigationState.setIn(["children",0],initialScene)
            return navigationState
        }
    }
    if(action.type === constants.POP_SCENE || action.type === constants.RESET_SCENE){
        scene = navigationState.current.scene;path = navigationState.current.path
    }
    function nestReducer(navState,navAction,scenePath){
        return scenePath.length > 0?navState.updateIn(scenePath,nestNavState=>navigationReducer(nestNavState,navAction)):
            navigationReducer(navState,navAction)
    }
    switch(action.type){
        case constants.PUSH_SCENE:
            navigationState = navigationState.set("current",{
                scene,path
            })
            const nextScene = scene.tabbar?scene.set("children",children=>children.map((item,i)=>{
                return {
                    index:0,
                    ...item,
                    children:[item.children[0]]
                }
            })):scene
            const injectedAction = {
                type:action.type,
                state:{
                    params:action.params,
                    ...nextScene,
                    key:action.key
                }
            }
            navigationState = nestReducer(navigationState,injectedAction,path)
            break
        case constants.POP_SCENE:
        case constants.JUMPTO_SCENE:
            navigationState = nestReducer(navigationState,action,path)
            break
        case constants.RESET_SCENE:
            navigationState = nestReducer(navigationState,action,path)
            break
    }
    return navigationState
}

function locateScene(scenes,key,path=[]) {
    let _scene = null
    if(key){
        for(let i in scenes){
            const scene = scenes[i]
            if(scene.key === key){
                _scene = {scene,path}
                break
            }
            if(scene.tabbar){
                for(let j in scene.children){
                    const item = scene.children[j]
                    _scene = locateScene(item.children,key,[...path,"children",i,"children",j])
                    if(_scene){
                        break
                    }
                }
            }
        }
    }
    return _scene
}
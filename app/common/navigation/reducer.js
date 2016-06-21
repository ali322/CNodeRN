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
            return {
                ...state,
                index:0,
                children:[]
            }
        case constants.RELOAD_SCENE:
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
    key:"root",
    children:[]
})
    
export default function routerReducer(navigationState=initialState,action){
    if(!Immutable.isImmutable(navigationState)){
        navigationState = Immutable.from(navigationState)
    }
    let scene,path,nextScene
    path = resolvePath(navigationState)
    if(action.type === constants.PUSH_SCENE){
        scene = locateScene(action.scenes,action.key)
        if(!scene){
            return navigationState
        }
        nextScene = scene
        if(path.length > 2){
            const tabbarPath = path.slice(0,-2)
            const tabbarScene = getInPath(navigationState,tabbarPath)
            if(tabbarScene){
                navigationState = navigationState.updateIn(tabbarPath,
                    tabbarState=>tabbarState.set("visible",typeof scene.hideTabBar === "boolean"?!scene.hideTabBar:true)
                )
            }
        }
        if(scene.tabbar){
            nextScene = scene.set("children",scene.children.map((item,i)=>{
                return {
                    index:0,
                    ...item,
                    children:[item.children[0]]
                }
            })).set("index",0)
        }
        if(navigationState.children.length === 0){
            navigationState = navigationState.setIn(["children",0],nextScene)
            return navigationState
        }
    }
    if(action.type === constants.POP_SCENE){
        if(path.length > 2){
            const prevScene = getInPath(navigationState,path).children.slice(-2,-1)
            const tabbarPath = path.slice(0,-2)
            const tabbarScene = getInPath(navigationState,tabbarPath)
            if(tabbarScene){
                navigationState = navigationState.updateIn(tabbarPath,
                    tabbarState=>tabbarState.set("visible",typeof prevScene.hideTabBar === "boolean"?!prevScene.hideTabBar:true)
                )
            }
        }
    }
    if(action.type === constants.FOCUS_SCENE){
        return focusScene(navigationState,action.key)
    }
    function nestReducer(navState,navAction,scenePath){
        return scenePath.length > 0?navState.updateIn(scenePath,nestNavState=>navigationReducer(nestNavState,navAction)):
            navigationReducer(navState,navAction)
    }
    switch(action.type){
        case constants.PUSH_SCENE:
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
        case constants.RELOAD_SCENE:
            navigationState = nestReducer(navigationState,action,path)
            break
        case constants.RESET_SCENE:
            navigationState = navigationReducer(navigationState,action)
            break
    }
    return navigationState
}

function resolvePath(navigationState,path=[]){
    if(navigationState.children.length > 0){
        const scene = navigationState.children[navigationState.index]
        if(scene.tabbar && scene.children.length > 0){
            path = resolvePath(scene.children[scene.index],
                [...path,"children",navigationState.index,"children",scene.index]
            )
        }
    }
    return path
}

function focusScene(navigationState,key){
    return navigationState.set("children",navigationState.children.map((scene,i)=>{
        if(scene.tabbar){
            for(let j in scene.children){
                const subScene = scene.children[j]
                if(subScene.key === key){
                    scene = scene.set("index",Number(j))
                    break
                }
                for(let k in subScene.children){
                    const innerScene = subScene.children[k]
                    if(innerScene.children && innerScene.children.length > 0){
                        scene = scene.updateIn(["chilren",j,"children",k],nestScene=>focusScene(nestScene,key))
                    }
                }
            }
        }
        return scene
    }))
}

function locateScene(scenes,key,path=[]) {
    let _scene = null
    if(key){
        for(let i in scenes){
            const scene = scenes[i]
            if(scene.key === key){
                _scene = scene
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

function getInPath(obj,path=[]){
    for(var i =0,l = path.length;obj!== null && i < l;i++){
        obj = obj[path[i]]
    }
    return (i && i === l)?obj:null
}
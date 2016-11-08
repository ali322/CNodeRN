'use strict'

import {NavigationExperimental} from "react-native"
import * as constants from "./constant"
import Immutable from "seamless-immutable"
import _ from "lodash"

const {
    StateUtils:NavigationStateUtils
} = NavigationExperimental

function navigationReducer(state={},action) {
    let nextRoutes = state.routes
    switch(action.type){
        case constants.PUSH_SCENE:
            if(state.routes[state.index].key === (action.state && action.state.key)){
                return state
            }
            nextRoutes = nextRoutes.set(nextRoutes.length,action.state)
            return {
                ...state,
                index:nextRoutes.length - 1,
                routes:nextRoutes
            }
            // return NavigationStateUtils.push(state,action.state)
        case constants.POP_SCENE:
            if(state.index === 0 || state.routes.length === 1){
                return state
            }
            nextRoutes = nextRoutes.slice(0,-1)
            return {
                ...state,
                index:nextRoutes.length - 1,
                routes:nextRoutes
            }
            // return NavigationStateUtils.pop(state)
        case constants.JUMPTO_SCENE:
            if(typeof action.key === "string"){
                return {
                    ...state,
                    index:indexOfRoute(state,action.key)
                }
                // return NavigationStateUtils.jumpTo(state,action.key)
            }
            return {
                ...state,
                index:action.key
            }
            // return NavigationStateUtils.jumpToIndex(state,action.key)
        case constants.RESET_SCENE:
            return {
                ...state,
                index:0,
                routes:[]
            }
        case constants.RELOAD_SCENE:
            return state.update("routes",children=>{
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
    routes:[]
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
        //initialize tabbar scene state
        if(scene.tabbar){
            nextScene = scene.set("routes",scene.routes.map((item,i)=>{
                return {
                    index:0,
                    ...item,
                    routes:[item.routes[0]]
                }
            })).set("index",0)
        }
        if(navigationState.routes.length === 0){
            navigationState = navigationState.setIn(["routes",0],nextScene)
            return navigationState
        }
    }
    if(action.type === constants.POP_SCENE){
        nextScene = getInPath(navigationState,path).routes.slice(-2,-1)[0]
    }
    //toggle tabbar visible
    if(path.length > 2 && (action.type === constants.POP_SCENE || action.type === constants.PUSH_SCENE)){
        const tabbarPath = path.slice(0,-2)
        const tabbarScene = getInPath(navigationState,tabbarPath)
        if(tabbarScene){
            navigationState = navigationState.updateIn(tabbarPath,
                tabbarState=>tabbarState.set("visible",typeof nextScene.hideTabBar === "boolean"?!nextScene.hideTabBar:true)
            )
        }
    }
    //switch scene between tabs
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

/**
 * resolve current scene path
 * @param {Object} navigationState
 * @param {Array<String>} [path=[]]
 * @returns Array<String>
 */
function resolvePath(navigationState,path=[]){
    if(navigationState.routes.length > 0){
        const scene = navigationState.routes[navigationState.index]
        if(scene.tabbar && scene.routes.length > 0){
            path = resolvePath(scene.routes[scene.index],
                [...path,"routes",navigationState.index,"routes",scene.index]
            )
        }
    }
    return path
}

/**
 * check route is exist in state
 * @param {any} state
 * @param {any} route
 */
function indexOfRoute(state,route){
    return state.routes.map(route=>route.key).indexOf(route.key)
}

/**
 * focus scene in tabbar
 * @param {Object} navigationState
 * @param {String} key
 * @returns Object
 */
function focusScene(navigationState,key){
    return navigationState.set("routes",navigationState.routes.map((scene,i)=>{
        if(scene.tabbar){
            for(let j in scene.routes){
                const subScene = scene.routes[j]
                if(subScene.key === key){
                    scene = scene.set("index",Number(j))
                    break
                }
                for(let k in subScene.routes){
                    const innerScene = subScene.routes[k]
                    if(innerScene.routes && innerScene.routes.length > 0){
                        scene = scene.updateIn(["routes",j,"routes",k],nestScene=>focusScene(nestScene,key))
                    }
                }
            }
        }
        return scene
    }))
}


/**
 * get scene from sceneMap by key
 * @param {Array<Object>} scenes
 * @param {String} key
 * @param {Array<String>} [path=[]]
 * @returns Object
 */
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
                for(let j in scene.routes){
                    const item = scene.routes[j]
                    _scene = locateScene(item.routes,key,[...path,"routes",i,"routes",j])
                    if(_scene){
                        break
                    }
                }
            }
        }
    }
    return _scene
}

/**
 * get scene by path
 * @param {Object} obj
 * @param {Array<String>} [path=[]]
 * @returns Object
 */
function getInPath(obj,path=[]){
    for(var i =0,l = path.length;obj!== null && i < l;i++){
        obj = obj[path[i]]
    }
    return (i && i === l)?obj:null
}
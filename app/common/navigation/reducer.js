'use strict'

import {
    NavigationExperimental
} from "react-native"
import * as constants from "./constant"
import Immutable from "seamless-immutable"
import _ from 'lodash'

const {
    StateUtils: NavigationStateUtils
} = NavigationExperimental

function navigationReducer(state = {}, action) {
    let nextRoutes = state.routes
    switch (action.type) {
        case constants.PUSH_SCENE:
            if (state.routes[state.index].key === (action.state && action.state.key)) {
                return state
            }
            nextRoutes = nextRoutes.set(nextRoutes.length, action.state)
            return state.merge({
                animationStyle:action.style,
                index: nextRoutes.length - 1,
                routes: nextRoutes
            })
        case constants.POP_SCENE:
        case constants.BACKTO_SCENE:
            if (state.index === 0 || state.routes.length === 1) {
                return state
            }
            nextRoutes = nextRoutes.slice(0, -1)
            if (action.type === constants.BACKTO_SCENE) {
                nextRoutes = _.takeWhile(nextRoutes, {
                    key: action.key
                })
            }
            return state.merge({
                animationStyle:action.style,
                index: nextRoutes.length - 1,
                routes: nextRoutes
            })
        case constants.FOCUS_SCENE:
            return focusScene(state, action.key)
        case constants.JUMPTO_SCENE:
            return jumpToScene(state, action)
        case constants.REPLACE_SCENE:
            nextRoutes = nextRoutes.set(nextRoutes.length - 1, action.state)
            return state.merge({
                animationStyle:action.style,
                routes: nextRoutes
            })
        case constants.RESET_SCENE:
            return state.merge({
                index: 0,
                routes: []
            })
        case constants.RELOAD_SCENE:
            return state.update("routes", children => {
                return children.flatMap(child => {
                    return child.set('_mark', Date.now()).set('params', action.params)
                })
            }).set('animationStyle',action.style)
        default:
            return state
    }
}

let initialState = Immutable({
    index: 0,
    key: "root",
    routes: []
})

export default function routerReducer(navigationState = initialState, action) {
    if (action.type === constants.RESET_SCENE || action.type === constants.FOCUS_SCENE) {
        return navigationReducer(navigationState, action)
    }
    let scene = {}
    if (action.type === constants.PUSH_SCENE || action.type === constants.REPLACE_SCENE) {
        scene = locateScene(action.scenes, action.key)
        if (!scene) {
            return navigationState
        }
        //initialize tabbar scene state
        if (scene.tabbar) {
            scene = scene.set("routes", scene.routes.flatMap((item, i) => {
                return item.merge({
                    index: 0,
                    routes: item.routes.slice(0, 1)
                })
            })).set("index", 0)
        }
        //push initial scene
        if (navigationState.routes.length === 0) {
            return navigationState.setIn(["routes", 0], scene)
        }
    }
    let path = resolvePath(navigationState)
        //toggle tabbar visible
    if (path.length > 2 && (action.type === constants.POP_SCENE ||
            action.type === constants.PUSH_SCENE ||
            action.type === constants.JUMPTO_SCENE ||
            action.type === constants.BACKTO_SCENE)) {
        if (action.type === constants.POP_SCENE) {
            scene = _.get(navigationState, path).routes.slice(-2, -1)[0]
        }
        if (action.type === constants.BACKTO_SCENE) {
            scene = _.get(navigationState, path).routes.find(v => v.key === action.key)
        }
        const tabbarPath = path.slice(0, -2)
        const tabbarScene = _.get(navigationState, tabbarPath)
        if (tabbarScene) {
            navigationState = navigationState.updateIn(tabbarPath,
                tabbarState => tabbarState.set("visible", typeof scene.hideTabBar === "boolean" ? !scene.hideTabBar : true)
            )
        }
    }

    function nestReducer(navState, navAction, scenePath) {
        return scenePath.length > 0 ? navState.updateIn(scenePath, nestNavState => navigationReducer(nestNavState, navAction)) :
            navigationReducer(navState, navAction)
    }

    switch (action.type) {
        case constants.REPLACE_SCENE:
        case constants.PUSH_SCENE:
            const injectedAction = {
                type: action.type,
                style: action.style,
                state: {
                    params: action.params,
                    ...scene,
                    key: action.key
                }
            }
            navigationState = nestReducer(navigationState, injectedAction, path)
            break
        case constants.POP_SCENE:
        case constants.BACKTO_SCENE:
        case constants.RELOAD_SCENE:
            navigationState = nestReducer(navigationState, action, path)
            break
        case constants.JUMPTO_SCENE:
            navigationState = nestReducer(navigationState, action, path.slice(0, -2))
            break
    }
    return navigationState
}

/**
 * jumpTo siblings tab scene
 */
function jumpToScene(navigationState, action) {
    let tabIndex = 0,
        subIndex = 0
    navigationState.routes.forEach((tab, i) => {
        const _index = tab.routes.findIndex(v => v.key == action.key)
        if (_index >= 0) {
            subIndex = _index
            tabIndex = i
        }
    })
    let nextState = navigationState.set('index', tabIndex)
    nextState = nextState.updateIn(['routes', tabIndex], tab => {
        let nextTab = tab.set('index', subIndex)
        nextTab = nextTab.set('routes', nextTab.routes.slice(0, subIndex + 1))
        nextTab = nextTab.updateIn(['routes', subIndex], v => v.set('params', action.params))
        return nextTab
    })
    return nextState
}

/**
 * focus scene in tabbar
 * @param {Object} navigationState
 * @param {String} key
 * @returns Object
 */
function focusScene(navigationState, key) {
    return navigationState.set("routes", navigationState.routes.map((scene, i) => {
        if (scene.tabbar) {
            for (let j in scene.routes) {
                const subScene = scene.routes[j]
                if (subScene.key === key) {
                    scene = scene.set("index", Number(j))
                    break
                }
                for (let k in subScene.routes) {
                    const innerScene = subScene.routes[k]
                    if (innerScene.routes && innerScene.routes.length > 0) {
                        scene = scene.updateIn(["routes", j, "routes", k], nestScene => focusScene(nestScene, key))
                    }
                }
            }
        }
        return scene
    }))
}

/**
 * resolve scene path
 * @param {Object} navigationState
 * @param {Array<String>} [path=[]]
 * @returns {Array<String>} path
 */
function resolvePath(navigationState, key = '', path = []) {
    if (navigationState.routes.length > 0) {
        const scene = key ? navigationState.routes.find(v => v.key === key) : navigationState.routes[navigationState.index]
        if (scene.tabbar && scene.routes.length > 0) {
            path = resolvePath(scene.routes[scene.index], key, [...path, "routes", navigationState.index, "routes", scene.index])
        }
    }
    return path
}

/**
 * get specified scene from sceneTree
 * @param {Array<Object>} scenes
 * @param {String} key
 * @param {Array<String>} [path=[]]
 * @returns {Object} scene
 */
function locateScene(scenes, key, path = []) {
    let _scene = null
    if (key) {
        for (let i in scenes) {
            const scene = scenes[i]
            if (scene.key === key) {
                _scene = scene
                break
            }
            if (scene.tabbar) {
                for (let j in scene.routes) {
                    const item = scene.routes[j]
                    _scene = locateScene(item.routes, key, [...path, "routes", i, "routes", j])
                    if (_scene) {
                        break
                    }
                }
            }
        }
    }
    return _scene
}
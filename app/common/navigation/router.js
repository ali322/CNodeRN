'use strict'

import React,{Component} from "react-native"
import Navigation from "./navigation"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import {navigationReducer} from "./reducer"
import * as actions from "./action"

class Router extends Component{
    static defaultProps = {
        scenes:[]
    }
    render(){
        const initialState = {
            navigationState:initialStateFromScenes(this.props.scenes),
            scenesMap:scenesMap(this.props.scenes)
        }
        const RouterContainer = containerByComponent(Navigation,navigationReducer,dispatch=>({
            navigationActions:bindActionCreators(actions,dispatch)
        }),initialState)
        return <RouterContainer/>
    }
}

function initialStateFromScenes(scenes){
    let state = {
        index:0,
        key:"root",
        children:[]
    }
    if(scenes.length > 0){
        state.children[0] = scenes.filter((scene)=>scene.initial)[0] || scenes[0]
    }
    return state
}

function scenesMap(scenes,parentScenes=[]){
    let scenesMapping = scenes.map((scene)=>{
        if(scene.tabbar){
            const items = scene.items.map((item)=>{
                return Object.assign({},item,scenes[item.sceneKey])
            })
            return scenesMap(items,scenes)
        }
        return scene
    })
    return scenesMapping
}

export default Router
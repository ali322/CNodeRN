'use strict'

import React,{Component} from "react-native"
import Navigation from "./navigation"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import routerReducer from "./reducer"
import * as actions from "./action"
import _ from "lodash"

class Router extends Component{
    static defaultProps = {
        scenes:[]
    }
    render(){
        const initialState = {
            navigationState:initialStateFromScenes(this.props.scenes),
            scenes:this.props.scenes
        }
        const RouterContainer = containerByComponent(Navigation,routerReducer,dispatch=>({
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
    const initialScene = _.cloneDeep(scenes[0])
    if(initialScene.tabbar){
        initialScene.items = initialScene.items.map((item,i)=>{
            return {
                index:0,
                ...item,
                children:[item.children[0]]
            }
        })
    }
    state.children[0] = initialScene
    return state
}

export default Router
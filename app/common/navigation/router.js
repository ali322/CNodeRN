'use strict'

import React,{Component,PropTypes} from "react-native"
import Navigation from "./navigation"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import routerReducer from "./reducer"
import * as actions from "./action"
import _ from "lodash"

class Router extends Component{
    constructor(props){
        super(props)
        this._scenes = this._scenesListByChilren(props.children)
    }
    _scenesListByChilren(chilren){
        const _scenes = React.Children.map(chilren,(child)=>{
            let nextChildren = null
            if(child.props.children){
                nextChildren = this._scenesListByChilren(child.props.children)
                return {key:child.key,...child.props,children:nextChildren}
            }else{
                const props = _.omit(child,"children")
                return {key:child.key,...child.props}
            }
        })
        return _scenes
    }
    render(){
        const initialState = {
            navigationState:initialStateFromScenes(this._scenes),
            scenes:this._scenes
        }
        const RouterContainer = containerByComponent(Navigation,routerReducer,dispatch=>({
            navigationActions:bindActionCreators(actions,dispatch)
        }),initialState)
        return <RouterContainer/>
    }
}

export class Scene extends Component{
    static propTypes = {
        key:PropTypes.string
    }
    render(){
        return null
    }
}

function initialStateFromScenes(scenes){
    let state = {
        index:0,
        key:"root",
        children:[]
    }
    let initialKey = _.findIndex(scenes,{initial:true})
    initialKey = initialKey > -1?initialKey:0
    const initialScene = _.cloneDeep(scenes[initialKey])
    if(initialScene.tabbar){
        initialScene.children = initialScene.children.map((item,i)=>{
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
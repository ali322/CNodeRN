'use strict'

import React,{Component,PropTypes} from "react-native"
import Navigation from "./navigation"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import routerReducer from "./reducer"
import * as actions from "./action"
import Immutable from "seamless-immutable"

class Router extends Component{
    static propTypes = {
        initialSceneKey:PropTypes.string
    }
    constructor(props){
        super(props)
        this._scenes = this._scenesListByChilren(props.children)
        // this._navigationState = initialStateFromScenes(this._scenes,props.initialSceneKey)
        let injectedActions = {}
        for(let actionName in actions){
            injectedActions[actionName] = (...args)=>{
                return actions[actionName](this._scenes,...args)
            }
        }
        this._navigationActions = bindActionCreators(injectedActions,props.dispatch)
    }
    _scenesListByChilren(chilren){
        const _scenes = React.Children.map(chilren,(child)=>{
            let nextChildren = null
            if(child.props.children){
                nextChildren = this._scenesListByChilren(child.props.children)
                return {key:child.key,...child.props,children:nextChildren}
            }else{
                return {key:child.key,...child.props}
            }
        })
        return Immutable(_scenes)
    }
    componentDidMount(){
        this._navigationActions.pushScene(this.props.initialSceneKey)
    }
    render(){
        if(!this.props.initialSceneKey){
            throw new Error("missing initialSceneKey")
        }
        return <Navigation navigationActions={this._navigationActions} navigationState={this.props.navigationState} 
        sceneProps={this.props.sceneProps}/>
        // }else{
        //     const initialState = {
        //         navigationState:this._navigationState,
        //         scenes:this._scenes,
        //         sceneProps:this.props.sceneProps
        //     }
        //     const RouterContainer = containerByComponent(Navigation,routerReducer,dispatch=>({
        //         navigationActions:bindActionCreators(actions,dispatch)
        //     }),initialState)
        //     return <RouterContainer/>
        // }
    }
}

export class Scene extends Component{
    static propTypes = {
        tabbar:PropTypes.bool,
        component:PropTypes.any,
        key:PropTypes.string
    }
    render(){
        return null
    }
}

function initialStateFromScenes(scenes,initialSceneKey){
    let state = Immutable({
        index:0,
        key:"root",
        children:[]
    })
    let initialSceneIndex = scenes.findIndex(scene=>scene.key === initialSceneKey)
    initialSceneIndex = initialSceneIndex > -1?initialSceneIndex:0
    let initialScene = scenes[initialSceneIndex]
    if(initialScene.tabbar){
        initialScene = initialScene.set("children",initialScene.children.map((item,i)=>{
            return {
                index:0,
                ...item,
                children:[item.children[0]]
            }
        }))
    }
    state = state.setIn(["children",0],initialScene)
    return state
}

export default Router
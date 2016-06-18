'use strict'

import React,{Component,PropTypes} from "react"
import Navigation from "./navigation"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import routerReducer from "./reducer"
import * as actions from "./action"
import Immutable from "seamless-immutable"

class Router extends Component{
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
    componentWillReceiveProps(nextProps){
        if((this.props.sceneProps.userPrefs !== nextProps.sceneProps.userPrefs) || (
            this.props.sceneProps.user !== nextProps.sceneProps.user
        )){
            this._navigationActions.resetScene()
            this._navigationActions.pushScene(this.props.initialSceneKey)
        }
    }
    render(){
        if(!this.props.initialSceneKey){
            throw new Error("missing initialSceneKey")
        }
        return <Navigation navigationActions={this._navigationActions} navigationState={this.props.navigationState} 
        sceneProps={this.props.sceneProps}/>
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

export default Router
'use strict'

import React,{Component,NavigationExperimental} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import {navigationReducer} from "./reducer"
import * as actions from "./action"
import _ from "lodash"

const {
    RootContainer:NavigationRootContainer,
    AnimatedView:NavigationAnimatedView,
    Card:NavigationCard
} = NavigationExperimental

class Navigation extends Component{
    static defaultProps = {
        scenes:[]
    }
    constructor(props){
        super(props)
        this.sceneConfigs = _.chain(props.scenes).groupBy("key").mapValues(v=>v[0]).value()
    }
    _renderScene(NavigationSceneRendererProps){
        return <NavigationCard {...NavigationSceneRendererProps} renderScene={({scene})=>{
            const {navigationState} = scene
            const params = navigationState.params
            const sceneConfig = this.sceneConfigs[navigationState.key]
            if(sceneConfig && sceneConfig.component){
                return React.createElement(sceneConfig.component,{
                    ...params,
                    sceneKey:navigationState.key,
                    ...this.props
                })
            }
            return null
        }} key={NavigationSceneRendererProps.scene.navigationState.key}/>
    }
    render(){
        const {navigationState} = this.props
        return (
            <NavigationAnimatedView navigationState={navigationState} onNavigate={()=>{}} 
            renderScene={this._renderScene.bind(this)}/>
        )
    }
}

const rootReducer = combineReducers({
    navigationState:navigationReducer
})

export default containerByComponent(Navigation,rootReducer,dispatch=>({
    navigationActions:bindActionCreators(actions,dispatch)
}))
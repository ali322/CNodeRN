'use strict'

import React,{Component,NavigationExperimental} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import TabNavigation from "./tabnavigation"
import {navigationReducer} from "./reducer"
import * as actions from "./action"
import _ from "lodash"

const {
    RootContainer:NavigationRootContainer,
    AnimatedView:NavigationAnimatedView,
    Card:NavigationCard
} = NavigationExperimental

class Navigation extends Component{
    _renderScene(NavigationSceneRendererProps){
        // console.log("NavigationSceneRendererProps",NavigationSceneRendererProps)
        return <NavigationCard {...NavigationSceneRendererProps} renderScene={({scene})=>{
            const {navigationState} = scene
            const params = navigationState.params
            // console.log("navigationState",navigationState,this.props.scenesMap)
            // const sceneConfig = this.sceneConfigs[navigationState.key]
            if(navigationState.tabbar){
                return <TabNavigation navigationState={navigationState} navigationActions={this.props.navigationActions}/>
            }
            if(navigationState.component){
                return React.createElement(navigationState.component,{
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
        // console.log("navigationState",navigationState)
        return (
            <NavigationAnimatedView navigationState={navigationState} onNavigate={()=>{}} 
            renderScene={this._renderScene.bind(this)}/>
        )
    }
}

export default Navigation
'use strict'

import React,{Component,PropTypes} from "react"
import {NavigationExperimental,StyleSheet,Animated,Easing,View,Text} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import TabNavigation from "./tabnavigation"
import {navigationReducer} from "./reducer"
import * as actions from "./action"

const {
    RootContainer:NavigationRootContainer,
    Transitioner:NavigationTransitioner,
    Card:NavigationCard
} = NavigationExperimental

const {
  CardStackPanResponder: NavigationCardStackPanResponder,
  CardStackStyleInterpolator: NavigationCardStackStyleInterpolator
} = NavigationCard

class Navigation extends Component{
    static propTypes = {
        navigationState:PropTypes.object
    }
    constructor(props){
        super(props)
        this._renderCard = this._renderCard.bind(this)
    }
    _renderCard(NavigationSceneRendererProps){
        const {sceneProps,navigationActions} = this.props
        const {route} = NavigationSceneRendererProps.scene
        return <NavigationCard {...NavigationSceneRendererProps} renderScene={this._renderScene.bind(this)}  
        key={NavigationSceneRendererProps.scene.route.key} sceneProps={sceneProps}/>
    }
    _renderScene(props){
        const {sceneProps,navigationActions} = this.props
        const {route} = props.scene
        if(route.tabbar){
            return <TabNavigation navigationState={route} navigationActions={this.props.navigationActions}
                sceneProps={sceneProps}/>
        }
        if(route.component){
            const params = route.params
            const SceneComponent = route.component
            return <SceneComponent navigationActions={navigationActions} isRequired={true} {...sceneProps} {...params}/>
        }
    }
    _configureTransition(){
        const easing = Easing.inOut(Easing.ease)
        return {
            duration:500,
            easing
        }
    }
    render(){
        const {navigationState,sceneProps,navigationActions} = this.props
        const options = {}
        return (
            <NavigationTransitioner style={styles.animatedView} 
            navigationState={navigationState} configureTransition={this._configureTransition}
            render={this._renderCard} {...options}/>
        )
    }
}

const styles = StyleSheet.create({
    animatedView:{
        flex:1,
        backgroundColor:"transparent"
    }
})

export default Navigation
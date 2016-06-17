'use strict'

import React,{Component,PropTypes} from "react"
import {NavigationExperimental,StyleSheet,Animated,View,Text} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "../../lib/redux-helper"
import TabNavigation from "./tabnavigation"
import {navigationReducer} from "./reducer"
import * as actions from "./action"

const {
    RootContainer:NavigationRootContainer,
    AnimatedView:NavigationAnimatedView,
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
        const {navigationState} = NavigationSceneRendererProps.scene
        const isVertical = navigationState.direction === "vertical"
        // const panHandlers = isVertical?NavigationCardStackPanResponder.forVertical(NavigationSceneRendererProps):
        //     NavigationCardStackPanResponder.forHorizontal(NavigationSceneRendererProps)
        // const animationStyle = isVertical?NavigationCardStackStyleInterpolator.forVertical(NavigationSceneRendererProps):
        //     NavigationCardStackStyleInterpolator.forHorizontal(NavigationSceneRendererProps)
        return <NavigationCard {...NavigationSceneRendererProps} renderScene={this._renderScene.bind(this)}  
        key={NavigationSceneRendererProps.scene.navigationState.key}/>
    }
    _renderScene(props){
        const {sceneProps,navigationActions} = this.props
        const {navigationState} = props.scene
        return <Navigation sceneProps={sceneProps} navigationActions={navigationActions} navigationState={navigationState}/>
    }
    render(){
        const {navigationState,sceneProps,navigationActions} = this.props
        if(navigationState.tabbar){
            return <TabNavigation navigationState={navigationState} navigationActions={this.props.navigationActions}
                sceneProps={sceneProps}/>
        }
        if(navigationState.component){
            const params = navigationState.params
            const SceneComponent = navigationState.component
            return <SceneComponent navigationActions={navigationActions} isRequired={true} {...sceneProps} {...params}/>
        }
        const options = {}
        options.applyAnimation = (pos,navState)=>{
            Animated.timing(pos,{toValue:navState.index,duration:300}).start()
        }
        return (
            <NavigationAnimatedView style={styles.animatedView} 
            navigationState={navigationState} onNavigate={()=>{}} 
            renderOverlay={()=>null}  
            renderScene={this._renderCard} {...options}/>
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
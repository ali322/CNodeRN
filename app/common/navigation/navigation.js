'use strict'

import React,{Component,NavigationExperimental,StyleSheet,Animated,PropTypes} from "react-native"
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
        const {navigationState} = NavigationSceneRendererProps.scene
        const isVertical = navigationState.direction === "vertical"
        const panHandlers = isVertical?NavigationCardStackPanResponder.forVertical(NavigationSceneRendererProps):
            NavigationCardStackPanResponder.forHorizontal(NavigationSceneRendererProps)
        const animationStyle = isVertical?NavigationCardStackStyleInterpolator.forVertical(NavigationSceneRendererProps):
            NavigationCardStackStyleInterpolator.forHorizontal(NavigationSceneRendererProps)
        return <NavigationCard {...NavigationSceneRendererProps} renderScene={(props/*NavigationSceneRendererProps*/ )=>{
            const params = navigationState.params
            if(navigationState.tabbar){
                return <TabNavigation navigationState={navigationState} navigationActions={this.props.navigationActions}/>
            }
            if(navigationState.component){
                return React.createElement(navigationState.component,{
                    ...params,
                    ...this.props
                })
            }
            return null
        }} panHandlers={panHandlers} style={animationStyle} 
        key={NavigationSceneRendererProps.scene.navigationState.key}/>
    }
    render(){
        const {navigationState} = this.props
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
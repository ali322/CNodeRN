'use strict'

import React,{Component,PureComponent,PropTypes} from "react"
import {NavigationExperimental,StyleSheet,Animated,Easing,View,Text,Dimensions} from "react-native"
import TabNavigation from "./tabnavigation"
import {navigationReducer} from "./reducer"
import * as actions from "./action"
import * as constants from "./constant"

const {
    Transitioner:NavigationTransitioner,
    Card:NavigationCard
} = NavigationExperimental

const {
    CardStackStyleInterpolator:NavigationCardStackStyleInterpolator
} = NavigationCard

const SCREEN_WIDTH = Dimensions.get("window").width

class Navigation extends PureComponent{
    static propTypes = {
        navigationState:PropTypes.object
    }
    constructor(props){
        super(props)
        this._renderCard = this._renderCard.bind(this)
    }
    static chooseAnimationStyle(NavigationSceneRendererProps,state){
        const {animationStyle} = state
        console.log('animationStyle',state)
        switch(animationStyle){
            case 'vertical':
                return NavigationCardStackStyleInterpolator.forVertical(NavigationSceneRendererProps)
            case 'left2right':
                return leftToRight(NavigationSceneRendererProps)
            case 'fade':
                return fadeInScene(NavigationSceneRendererProps)
            default:
                return NavigationCardStackStyleInterpolator.forHorizontal(NavigationSceneRendererProps)
        }
    }
    _renderCard(NavigationSceneRendererProps){
        const {sceneProps,navigationActions} = this.props
        const {route} = NavigationSceneRendererProps.scene
        const state = NavigationSceneRendererProps.navigationState
        let animationStyle = Navigation.chooseAnimationStyle(NavigationSceneRendererProps,state)
        return <NavigationCard {...NavigationSceneRendererProps} renderScene={this._renderScene.bind(this)}  
        key={NavigationSceneRendererProps.scene.route.key} sceneProps={sceneProps} style={animationStyle}/>
    }
    _renderScene(props){
        const {sceneProps,navigationActions} = this.props
        const {route} = props.scene
        if(route.tabbar){
            return <TabNavigation navigationState={route} navigationActions={this.props.navigationActions}
                sceneProps={sceneProps} component={route.component}/>
        }
        if(route.component){
            const params = route.params
            const SceneComponent = route.component
            return <SceneComponent navigationActions={navigationActions} {...sceneProps} {...params}/>
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

function fadeInScene(/* NavigationSceneRendererProps */ props) {
  const {
    position,
    scene,
  } = props;

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 0.3],
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: [1, 1, 0.95],
  });

  const translateY = 0;
  const translateX = 0;

  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY },
    ],
  };
}

function leftToRight(/* NavigationSceneRendererProps */ props) {
  const {
    position,
    scene,
  } = props;

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];

  const translateX = position.interpolate({
    inputRange,
    outputRange: [0, 0, -SCREEN_WIDTH],
  });

  return {
    transform: [
      { translateX },
    ],
  };
}

const styles = StyleSheet.create({
    animatedView:{
        flex:1,
        backgroundColor:"transparent"
    }
})

export default Navigation
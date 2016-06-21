'use strict'
import React,{Component,PropTypes} from "react"
import {StyleSheet,View,Text} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import TabBar from "../component/tabbar"
import Navigation from "./navigation"
import Router from "./router"

class TabNavigation extends Component{
    static propTypes = {
        navigationState:PropTypes.object,
        navigationActions:PropTypes.object
    }
    render(){
        const {navigationState,navigationActions,sceneProps} = this.props
        return (
            <TabBar sceneProps={sceneProps} activeIndex={navigationState.index} visible={navigationState.visible}>
                {navigationState.children.map((item,i)=>{
                    return (
                        <TabBar.Item key={i} beforeSelect={()=>{
                            navigationActions.focusScene(item.key)
                            return item.onSelect?item.onSelect(navigationState,navigationActions):true
                        }} 
                        title={item.title} iconName={item.iconName}>
                            <Navigation navigationState={item} navigationActions={navigationActions} sceneProps={sceneProps}/>
                        </TabBar.Item>
                    )
                })}
            </TabBar>
        )
    }
}

export default TabNavigation
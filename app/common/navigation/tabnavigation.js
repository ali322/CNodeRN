'use strict'
import React,{Component,PropTypes} from "react"
import {StyleSheet,View,Text} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import TabBar from "./tabbar"
import Navigation from "./navigation"
import Router from "./router"

class TabNavigation extends Component{
    static propTypes = {
        navigationState:PropTypes.object,
        navigationActions:PropTypes.object
    }
    render(){
        const {navigationState,navigationActions,sceneProps} = this.props
        const TabBarComponent = this.props.component?this.props.component:TabBar
        return (
            <TabBarComponent {...sceneProps} activeIndex={navigationState.index} visible={navigationState.visible}>
                {navigationState.routes.map((item,i)=>{
                    return (
                        <TabBarComponent.Item key={i} beforeSelect={()=>{
                            const selectable = item.onSelect?item.onSelect(navigationState,navigationActions):true
                            if(selectable){
                                navigationActions.focusScene(item.key)
                            }
                            return selectable
                        }} 
                        title={item.title} iconName={item.iconName} iconTag={item.iconTag}>
                            <Navigation navigationState={item} navigationActions={navigationActions} sceneProps={sceneProps}/>
                        </TabBarComponent.Item>
                    )
                })}
            </TabBarComponent>
        )
    }
}

export default TabNavigation
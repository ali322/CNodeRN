'use strict'

import React,{Component,View,Text,StyleSheet} from "react-native"
import {Router,Scene,Reducer} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"

import topicScene from "./topic/scene"

const reducerCreator = (params)=>{
    const defaultReducer = Reducer(params)
    return (state,action)=>{
        return defaultReducer(state,action)
    }
}

const tabBarItemCreator = (tintText,iconConfig)=>{
    return class extends Component{
        render(){
            return <View style={styles.tabBarItem}>
                <Icon {...iconConfig}/>
                <Text style={styles.tabBarItemText}>{tintText}</Text>
            </View>
        }
    }
} 

export default class App extends Component{
    render(){
        return (
            <Router createReducer={reducerCreator}>
                <Scene key="root">
                    <Scene tabs={true} key="tabbar" hideNavBar={true} tabBarStyle={styles.tabBar}>
                        <Scene key="tab1" icon={tabBarItemCreator("主题",{name:"coffee",size:18})}>{topicScene}</Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    tabBarItem: {
        flexDirection: "column",
        alignItems: "center"
    },
    navigationBar: {
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD"
    },
    tabBar: {
        backgroundColor: "#F7F7F7",
        borderTopWidth: 1,
        borderTopColor: "#DDD"
    },
    tabBarItemText: {
        fontSize: 12,
        color: "#666",
        paddingTop:3
    }
})
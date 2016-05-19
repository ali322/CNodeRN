'use strict'

import React,{Component,View,Text,StyleSheet,NavigationExperimental} from "react-native"
import {Router,Scene,Reducer,Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"
import Tabs from "react-native-tabs"

import MessageCounter from "./common/messagecounter"
import topicScene from "./topic/scene"
import mineScene from "./mine/scene"
import messageScene from "./message/scene"
import collectScene from "./collect/scene"

import Qrcode from "./authorize/qrcode"
import Login from "./authorize/login"

import Storage from "./lib/storage"
global.storage = new Storage()

const tabBarItemCreator = (tintText,iconConfig,renderCounter=()=>{})=>{
    return class extends Component{
        render(){
            const {selected} = this.props
            return <View style={styles.tabBarItem}>
                {renderCounter()}
                <Icon {...iconConfig} color={selected?"blue":"#333"}/>
                <Text style={[styles.tabBarItemText,selected?{color:"blue"}:null]}>{tintText}</Text>
            </View>
        }
    }
}

export default class extends Component{
    render(){
        return (
            <Router>
                <Scene key="root">
                    <Scene tabs={true} key="tabbar" hideNavBar={true} tabBarStyle={styles.tabBar}>
                        <Scene key="tab1" icon={tabBarItemCreator("主题",{name:"coffee",size:20})}>{topicScene}</Scene>
                        <Scene key="tab2" icon={tabBarItemCreator("收藏",{name:"bookmark",size:20})}>{collectScene}</Scene>
                        <Scene key="tab3" icon={tabBarItemCreator("消息",{name:"envelope",size:20},()=><MessageCounter />)}>{messageScene}</Scene>
                        <Scene key="tab4" icon={tabBarItemCreator("我的",{name:"user",size:20})}>{mineScene}</Scene>
                    </Scene>
                    <Scene key="qrcode" component={Qrcode} hideNavBar={true}/>
                    <Scene key="login" component={Login} hideNavBar={true}/>
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
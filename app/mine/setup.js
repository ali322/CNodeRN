'use strict'

import React,{Component,View,Text,TouchableHighlight,TouchableOpacity,Alert} from "react-native"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"
import NavBar from "../common/navbar"

import {containerByComponent} from "../lib/redux-helper"
import {clearUser} from "./action"
import {userReducer} from "./reducer"

import styles from "./stylesheet/setup"

class Setup extends Component{
    _handleLogout(){
        Alert.alert("确定退出?","",[
            {text:"取消",style:"cancel"},
            {text:"确定",onPress:()=>{
                global.storage.removeItem("user").then((err)=>{
                    if(err){
                        Alert.alert(err)
                    }else{
                        this.props.clearUser()
                    }
                })
                
            }}
        ])
    }
    render(){
        return (
            <View style={styles.container}>
            <NavBar title="设置" />
            <View style={styles.setupPanel}>
                <TouchableHighlight style={[styles.setupRow,{borderBottomWidth:0.5}]}>
                    <Text style={styles.setupRowLabelText}>清除缓存</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.setupRow} onPress={this._handleLogout.bind(this)}>
                    <Text style={[styles.setupRowLabelText,{color:"#FF3300"}]}>切换用户</Text>
                </TouchableHighlight>
            </View>
            </View>
        )
    }
}

export default containerByComponent(Setup,userReducer,{clearUser})
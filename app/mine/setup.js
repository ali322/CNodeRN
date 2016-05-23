'use strict'

import React,{Component,View,Text,TouchableHighlight,TouchableOpacity,Alert,Switch,Slider} from "react-native"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"
import codePush from "react-native-code-push"
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
    async handleCheckForUpdate(){
        const update = await codePush.checkForUpdate("L1jnpcaxxrs0bxi_LWkQbZfcNdA34JhlxojfW")
        console.log("update",update)
    }
    render(){
        return (
            <View style={styles.container}>
            <NavBar title="设置" />
            <View style={styles.setupPanel}>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText]}>清除缓存</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Text style={styles.setupAccessoryText}>无缓存</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.setupRow,{borderBottomWidth:0.5}]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText]}>夜间模式</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Switch style={{marginBottom:1}}/>
                    </View>
                </View>
                <View style={[styles.setupRow,{borderBottomWidth:0.5}]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText]}>字体大小</Text>
                    </View>
                    <View style={styles.setupRowContent}>
                        <Slider maximumValue={20} minimumValue={12}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.setupRow} onPress={this.handleCheckForUpdate.bind(this)}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText]}>检查更新</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Text style={styles.setupAccessoryText}>v0.0.1</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.setupPanel}>
                <TouchableHighlight style={styles.setupRow} onPress={this._handleLogout.bind(this)}>
                    <Text style={[styles.setupRowLabelText,{color:"#FF3300"}]}>切换用户</Text>
                </TouchableHighlight>
            </View>
            </View>
        )
    }
}

export default containerByComponent(Setup,userReducer,{clearUser})
'use strict'

import React,{Component} from "react"
import {View,Text,TouchableHighlight,TouchableOpacity,Switch,Slider} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import NavBar from "../common/component/navbar"
import Alert from "../common/component/alert"

import containerByComponent from "../lib/redux-helper"
import {clearUser} from "./action"
import {userReducer} from "./reducer"

import styles from "./stylesheet/setup"
import preferredThemeByName from "../common/stylesheet/theme"

class Setup extends Component{
    constructor(props){
        super(props)
        this._preferredTheme = preferredThemeByName(props.userPrefs["preferredTheme"])
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
            this._preferredTheme = preferredThemeByName(nextProps.userPrefs["preferredTheme"])
        }
    }
    _handleLogout(){
        this._alert.alert("确定退出?","",[
            {text:"取消",style:"cancel"},
            {text:"确定",onPress:()=>{
                global.storage.removeItem("user").then((err)=>{
                    if(err){
                        this._alert.alert(err,"")
                    }else{
                        this.props.actions.clearUser()
                    }
                })
                
            }}
        ])
    }
    _handleChangeTheme(enabled){
        let userPrefs = Object.assign({},this.props.userPrefs)
        userPrefs["preferredTheme"] = enabled? "dark" : "light"
        this.props.saveUserPrefs(userPrefs)
    }
    render(){
        const {userPrefs,navigationActions} = this.props
        return (
            <View style={[styles.container,this._preferredTheme["container"]]}>
            <NavBar title="设置" 
            onLeftButtonClick={navigationActions.popScene} 
            userPrefs={this.props.userPrefs}/>
            <View style={[styles.setupPanel,this._preferredTheme["setupPanel"]]}>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5},this._preferredTheme["setupRow"]]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText,this._preferredTheme["setupRowLabelText"]]}>清除缓存</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Text style={[styles.setupAccessoryText,this._preferredTheme["setupRowLabelText"]]}>无缓存</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.setupRow,{borderBottomWidth:0.5},this._preferredTheme["setupRow"]]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText,this._preferredTheme["setupRowLabelText"]]}>夜间模式</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Switch style={{marginBottom:1}} onValueChange={this._handleChangeTheme.bind(this)} 
                        value={userPrefs && userPrefs["preferredTheme"] === "dark"}/>
                    </View>
                </View>
                <View style={[styles.setupRow,{borderBottomWidth:0.5},this._preferredTheme["setupRow"]]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText,this._preferredTheme["setupRowLabelText"]]}>字体大小</Text>
                    </View>
                    <View style={styles.setupRowContent}>
                        <Slider maximumValue={20} minimumValue={12}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.setupRow} onPress={()=>navigationActions.pushScene("updater")}>
                    <View style={styles.setupRowLabel}>
                        <Text style={[styles.setupRowLabelText,this._preferredTheme["setupRowLabelText"]]}>检查更新</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Text style={[styles.setupRowLabelText]}><Icon name="angle-right" size={22} color="#666"/></Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.setupPanel,this._preferredTheme["setupPanel"]]}>
                <TouchableHighlight style={styles.setupRow} onPress={this._handleLogout.bind(this)}>
                    <Text style={[styles.setupRowLabelText,{color:"#FF3300"}]}>切换用户</Text>
                </TouchableHighlight>
            </View>
            <Alert ref={view=>this._alert=view}/>
            </View>
        )
    }
}

export default containerByComponent(Setup,userReducer,{clearUser})
'use strict'

import React,{Component} from "react"
import {View} from "react-native"
import Anonymous from "../common/module/anonymous"
import NavBar from "../common/component/navbar"

import defaultStyles from "./stylesheet"
import preferredThemer from "../common/theme"

@preferredThemer(defaultStyles)
class Login extends Component{
    render(){
        const {navigationActions,styles}= this.props
        return (
            <View style={styles.container}>
            <NavBar title="登录" onLeftButtonClick={navigationActions.popScene} userPrefs={this.props.userPrefs}/>
            <Anonymous toLogin={()=>navigationActions.pushScene("qrcode")}/>
            </View>
        )
    }
}

export default Login


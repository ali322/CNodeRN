'use strict'

import React,{Component,View} from "react-native"
import Anonymous from "../common/module/anonymous"
import NavBar from "../common/component/navbar"

import styles from "./stylesheet"

class Login extends Component{
    render(){
        const {navigationActions}= this.props
        return (
            <View style={styles.container}>
            <NavBar title="登录" goBack={()=>navigationActions.popScene("login")}/>
            <Anonymous toLogin={navigationActions.pushScene("qrcode")}/>
            </View>
        )
    }
}

export default Login


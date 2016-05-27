'use strict'

import React, {Component, View, StyleSheet, Dimensions, Text, TouchableOpacity,Platform} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import {Actions} from "react-native-router-flux"

import Scanner from "../common/component/scanner"
import NavBar from "../common/component/navbar"
import Toast from "../common/component/toast"

import containerByComponent from "../lib/redux-helper"
import {authorizeByToken} from "./action"
import {authorizeReducer} from "./reducer"

class QrCode extends Component {
    constructor(props) {
        super(props)
        this.successed = false
    }
    handleBarCodeRead(ret) {
        if(this.successed){
            return
        }
        this.successed = true
        this.props.authorizeByToken(ret.data)
    }
    // componentDidMount(){
    //     this.props.authorizeByToken("01206bae-f6ed-42de-bd0e-3775776deaf9")
    // }
    componentWillReceiveProps(nextProps){
        if(!nextProps.isAuthorizing && this.props.isAuthorizing){
            if(nextProps.isAuthorized){
                this.toast.show("登录成功",()=>{
                    global.storage.setItem("user",nextProps.user).then((err)=>{
                        Actions.pop()
                    })
                })
            }else{
                this.toast.show("登录失败")
            }
        }
    }
    render() {
        console.log("this.props",this.props)
        return (
            <View style={styles.container}>
                <NavBar leftButton="取消"/>
                <Scanner handleBarCodeRead={this.handleBarCodeRead.bind(this)}/>
                <Toast ref={(view)=>this.toast=view}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})

export default containerByComponent(QrCode,authorizeReducer,{authorizeByToken})
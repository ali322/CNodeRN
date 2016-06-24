'use strict'

import React,{Component} from "react"
import {View, StyleSheet, Dimensions, Text, TouchableOpacity,Platform} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

import Scanner from "../common/component/scanner"
import NavBar from "../common/component/navbar"
import Toast from "../common/component/toast"

import containerByComponent from "../lib/redux-helper"
import {authorizeByToken} from "./action"
import {authorizeReducer} from "./reducer"

import preferredThemer from "../common/theme"

const defaultStyles = StyleSheet.create({
    container:{
        flex: 1
    }
})

@preferredThemer(defaultStyles)
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
        this.props.actions.authorizeByToken(ret.data)
    }
    componentWillReceiveProps(nextProps){
        const {navigationActions} = this.props
        if(!nextProps.isAuthorizing && this.props.isAuthorizing){
            if(nextProps.isAuthorized){
                this.toast.show("登录成功",()=>{
                    this.props.saveAuthentication(nextProps.user)
                })
            }else{
                this.toast.show("登录失败")
            }
        }
    }
    // componentDidMount(){
    //     this.props.saveAuthentication({
    //         username:"ali322",
    //         accessToken:"01206bae-f6ed-42de-bd0e-3775776deaf9"
    //     })
    // }
    render() {
        const {navigationActions,styles} = this.props
        return (
            <View style={styles.container}>
                <NavBar leftButton="取消" onLeftButtonClick={navigationActions.popScene} userPrefs={this.props.userPrefs}/>
                <Scanner handleBarCodeRead={this.handleBarCodeRead.bind(this)}/>
                <Toast ref={(view)=>this.toast=view}/>
            </View>
        )
    }
}

export default containerByComponent(QrCode,authorizeReducer,{authorizeByToken})
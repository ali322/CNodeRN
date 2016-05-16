'use strict'

import React,{Component,View,Text,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import {Actions} from "react-native-router-flux"
import NavigationBar from "react-native-navbar"

import styles from "./stylesheet"

class Login extends Component{
    renderNavigationBar(){
        const title = (
            <View style={styles.navigationBarTitle}>
                <Text style={styles.navigationBarTitleText}>登录</Text>
            </View>
        )
        const leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton, { marginLeft: 5 }]} onPress={() => Actions.pop() }>
                <Icon name="angle-left" size={25} color="#666"/>
                <Text style={styles.navigationBarButtonText}>返回</Text>
            </TouchableOpacity>
        )
        return <NavigationBar title={title} leftButton={leftButton} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    render(){
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            <View style={styles.mineBreif}>
            <View style={styles.mineAuthorize}>
                    <TouchableOpacity style={styles.mineAuthorizeQrcode} onPress={() => Actions.qrcode() }>
                        <Icon name="qrcode" size={30}/>
                        <Text style={{ paddingLeft: 8 }}>扫码登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}

export default Login


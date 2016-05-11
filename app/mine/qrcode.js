'use strict'

import React, {Component, View, StyleSheet, Dimensions, Text, TouchableOpacity,Alert} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import Camera from "react-native-camera"

import navigationBarStyle from "../common/stylesheet/navigationbar"

import {containerByComponent} from "../lib/redux-helper"
import {authorizeByToken} from "./action"
import {userReducer} from "./reducer"

class QrCode extends Component {
    constructor(props) {
        super(props)
        this.successed = false
    }
    renderNavigationBar() {
        const leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton, { marginLeft: 5 }]} onPress={() => Actions.pop() }>
                <Icon name="angle-left" size={25} color="#666"/>
                <Text style={styles.navigationBarButtonText}>取消</Text>
            </TouchableOpacity>
        )
        return <NavigationBar leftButton={leftButton}/>
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
                Alert.alert("登录成功")
                global.storage.setItem("user",nextProps.user).then((err)=>{
                    Actions.mine()
                })
            }else{
                Alert.alert("登录失败")
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderNavigationBar() }
                <Camera style={styles.preview} aspect={Camera.constants.Aspect.fill}
                    onBarCodeRead={this.handleBarCodeRead.bind(this)}>
                        <View style={styles.scanner}>
                            <View key={1} style={[styles.borderLeftTop, styles.borderBox]}></View>
                            <View key={2} style={[styles.borderRightTop, styles.borderBox]}></View>
                            <View key={3} style={[styles.borderLeftBottom, styles.borderBox]}></View>
                            <View key={4} style={[styles.borderRightBottom, styles.borderBox]}></View>
                        </View>
                        <View style={styles.scannerBreif}>
                            <Text style={styles.scannerHint}>请将二维码放到框内</Text>
                            <Icon name="camera" size={35} style={styles.capture}/>
                        </View>
                </Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ...navigationBarStyle,
    container:{
        flex: 1
    },
    preview:{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    capture:{
        backgroundColor: "transparent",
        opacity: 0.8,
        color: "#333",
        padding: 10,
        margin: 40,
        flex: 0
    },
    scannerBreif:{
        backgroundColor:"rgba(0,0,0,0.8)",
        width:Dimensions.get("window").width,
        marginTop:20,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    scanner:{
      width:250,
      height:250,
      backgroundColor:"transparent"
    },
    scannerHint:{
      marginTop:40,
      color: 'rgba(255,255,255,0.7)',
      fontSize:18,
      backgroundColor:"transparent" 
    },
    borderBox: {
		position: 'absolute',
		borderWidth: 2,
		height: 35,
		width: 35
	},
	borderLeftTop: {
		borderColor: 'transparent',
		borderLeftColor: 'rgba(255,255,255,0.6)',
		borderTopColor: 'rgba(255,255,255,0.6)',
		left: 0,
		top: 0
	},
	borderRightTop: {
		borderColor: 'transparent',
		borderRightColor: 'rgba(255,255,255,0.6)',
		borderTopColor: 'rgba(255,255,255,0.6)',
		right: 0,
		top: 0
	},
	borderLeftBottom: {
		borderColor: 'transparent',
		borderLeftColor: 'rgba(255,255,255,0.6)',
		borderBottomColor: 'rgba(255,255,255,0.6)',
		left: 0,
		bottom: 0
	},
	borderRightBottom: {
		borderColor: 'transparent',
		borderRightColor: 'rgba(255,255,255,0.6)',
		borderBottomColor: 'rgba(255,255,255,0.6)',
		right: 0,
		bottom: 0
	}
})

export default containerByComponent(QrCode,userReducer,{authorizeByToken})
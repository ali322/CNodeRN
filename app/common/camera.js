'use strict'

import React,{Component,View,StyleSheet,Dimensions,Text,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import Camera from "react-native-camera"

import navigationBarStyle from "./stylesheet/navigationbar"

class CameraRoll extends Component{
    constructor(props){
        super(props)
        this.state = {
            barcode:"123"
        }
    }
    renderNavigationBar(){
        const leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>Actions.pop()}>
            <Icon name="angle-left" size={25} color="#666"/>
            <Text style={styles.navigationBarButtonText}>{this.state.barcode}</Text>
            </TouchableOpacity>
        )
        return <NavigationBar leftButton={leftButton}/>
    }
    handleBarCodeRead(e){
        this.setState({
            barcode:"321"
        })
    }
    render(){
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            <Camera style={styles.preview} aspect={Camera.constants.Aspect.fill} 
            onFocusChanged={()=>this.handleBarCodeRead.bind(this)}>
            <Icon name="camera" size={35} style={styles.capture}/>
            </Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ...navigationBarStyle,
    container:{
        flex:1
    },
    preview:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height
    },
    capture:{
        backgroundColor:"transparent",
        opacity:0.8,
        color:"#333",
        padding:10,
        margin:40,
        flex:0
    }
})

export default CameraRoll
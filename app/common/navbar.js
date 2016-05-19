'use strict'

import React,{Component,View,Text,StyleSheet,TouchableOpacity,Platform} from "react-native"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"
import NavigationBar from "react-native-navbar"
import _ from "lodash"

class NavBar extends Component{
    render(){
        const {tintColor,leftButton,rightButton,title} = this.props
        let _title = null
        if(_.isString(title)){
            _title = (
                <View style={styles.navigationBarTitle}>
                    <Text style={styles.navigationBarTitleText}>{title}</Text>
                </View>
            )
        }else if(_.isFunction(title)){
            _title = title()
        }
        
        let _leftButton = null
        if(_.isString(leftButton)){
            _leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>Actions.pop()}>
                <Text style={styles.navigationBarButtonText}>{leftButton}</Text>
            </TouchableOpacity>
            )
        }else if(_.isFunction(leftButton)){
            _leftButton = leftButton()
        }
        
        let _rightButton = null
        if(_.isString(rightButton)){
            _rightButton = (
            <View style={[styles.navigationBarButton,{marginLeft:5}]}>
                <Text style={styles.navigationBarButtonText}>rightButton</Text>
            </View>
            )
        }else if(_.isFunction(rightButton)){
            _rightButton = rightButton()
        }
        
        const navbarConfig = Object.assign({},
            _title?{title:_title}:null,
            _leftButton?{leftButton:_leftButton}:null,
            _rightButton?{rightButton:_rightButton}:null)
        return (
            <NavigationBar {...navbarConfig}
            tintColor={tintColor} style={styles.navigationBar}/>
        )
    }
}

NavBar.defaultProps = {
    tintColor:"#F8F8F8",
    leftButton:"返回"
}

const styles = StyleSheet.create({
    navigationBar:{
        borderBottomWidth:0.5,
        borderBottomColor:"#DDD"
    },
    navigationBarButton:{
        marginRight:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:50
    },
    navigationBarButtonText:{
        fontSize:16,
        color:"#666"
        // paddingLeft:3 
    },
    navigationBarTitle:{
        // height:20,
        marginVertical:Platform.OS === "ios"?8:6,
        // flex:1,
        flexDirection:"row",
        alignItems:"center"
    },
    navigationBarTitleText:{
        fontSize:16
    }
})

export default NavBar
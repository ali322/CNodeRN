'use strict'

import React,{Component} from "react"
import {View,Text,TouchableOpacity,StatusBar,StyleSheet,Platform,Dimensions} from "react-native"
import _ from "lodash"
import {preferredStyles,preferredThemeDefines} from "../../lib/helper"

import preferredThemeByName from "../stylesheet/theme"

class NavBar extends Component{
    static defaultProps = {
        leftButton:"返回"
    }
    constructor(props){
        super(props)
        this._renderNavBar = this._renderNavBar.bind(this)
        this._preferredTheme = preferredThemeByName(props.userPrefs["preferredTheme"])
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
            if(Platform.OS === "ios"){
                StatusBar.setBarStyle((nextProps.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
            }
            this._preferredTheme = preferredThemeByName(nextProps.userPrefs["preferredTheme"])
        }
    }
    componentDidMount(){
        if(Platform.OS === "ios"){
            StatusBar.setBarStyle((this.props.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
        }
    }
    _renderNavBar(){
        const {title,leftButton,rightButton,onLeftButtonClick,onRightButtonClick} = this.props
        let _title = (
            <View style={styles.navigationBarTitle}>
            {_.isString(title)?<Text style={[styles.navigationBarTitleText,this._preferredTheme["navigationBarTitleText"]]}>{title}</Text>:
                React.isValidElement(title)?title:null}
            </View>
        )
        if(_.isFunction(title)){
            _title = title()
        }
        
        let _leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={onLeftButtonClick || (()=>{})}>
            {_.isString(leftButton)?<Text style={[styles.navigationBarButtonText,this._preferredTheme["navigationBarButtonText"]]}>{leftButton}</Text>:
                React.isValidElement(leftButton)?leftButton:null}
            </TouchableOpacity>
        )
        if(_.isFunction(leftButton)){
            _leftButton = leftButton()
        }
        
        let _rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={onRightButtonClick || (()=>{})}>
            {_.isString(rightButton)?<Text style={[styles.navigationBarButtonText,this._preferredTheme["navigationBarButtonText"] ]}>{rightButton}</Text>:
                React.isValidElement(rightButton)?rightButton:null}
            </TouchableOpacity>
        )
        if(_.isFunction(rightButton)){
            _rightButton = rightButton()
        }
        
        return (
            <View style={styles.navigationBar}>
            {_leftButton}{_title}{_rightButton}
            </View>
        )
    }
    render(){
        return (
            <View style={[styles.header,this._preferredTheme["header"]]}>
            {Platform.OS === "ios"?<StatusBar />:null}
            {this._renderNavBar()}
            </View>
        )
    }
}

const stylesForAll = {
    header:{
        height:64,
        borderBottomWidth:0.5,
        borderBottomColor:"#DDD",
        backgroundColor:"#F8F8F8"
    },
    navigationBar:{
        marginTop:Platform.OS === "ios"?20:0,
        flexDirection:"row",
        alignItems:"center",
        flex:1
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
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    navigationBarTitleText:{
        fontSize:16
    }
}

const styles = StyleSheet.create(stylesForAll)

export default NavBar
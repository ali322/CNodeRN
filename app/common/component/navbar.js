'use strict'

import React,{Component,View,Text,TouchableOpacity,StatusBar,StyleSheet,Platform} from "react-native"
import _ from "lodash"
import {preferredStyles,preferredThemeDefines} from "../../lib/helper"

class NavBar extends Component{
    static defaultProps = {
        leftButton:"返回"
    }
    constructor(props){
        super(props)
        this._renderNavBar = this._renderNavBar.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
            StatusBar.setBarStyle((nextProps.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
        }
    }
    componentDidMount(){
        if(global.userPrefs){
            StatusBar.setBarStyle((global.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
        }
    }
    _renderNavBar(){
        const {title,leftButton,rightButton,goBack} = this.props
        const styles = preferredStyles(stylesForAll,global.userPrefs)
        const defines = preferredThemeDefines(global.userPrefs)
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
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={goBack || (()=>{})}>
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
        return (
            <View style={styles.navigationBar}>
            {_leftButton}{_title}{_rightButton}
            </View>
        )
    }
    render(){
        const headerStyle = {
            height:64,
            borderBottomWidth:0.5,
            borderBottomColor:"#DDD",
            backgroundColor:"#F8F8F8"
        }
        return (
            <View style={headerStyle}>
            <StatusBar />
            {this._renderNavBar()}
            </View>
        )
    }
}

const stylesForAll = {
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

export default NavBar
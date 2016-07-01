'use strict'

import React,{Component} from "react"
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import NavBar from "../common/component/navbar"

import defaultStyles from "./stylesheet/setup"
import preferredThemer from "../common/theme"


@preferredThemer(defaultStyles)
class FontSwitcher extends Component{
    constructor(props){
        super(props)
    }
    _handleChangeFont(size){
        let userPrefs = Object.assign({},this.props.userPrefs)
        userPrefs["preferredFontSize"] = size
        this.props.saveUserPrefs(userPrefs)
    }
    render(){
        const {styles,navigationActions,userPrefs} = this.props
        return (
            <View style={styles.container}>
            <NavBar title="字体大小" 
            onLeftButtonClick={navigationActions.popScene} 
            userPrefs={this.props.userPrefs}/>
            <View style={styles.setupPanel}>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={()=>this._handleChangeFont(14)}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>小</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                       <Text style={[styles.setupRowLabelText]}>{userPrefs["preferredFontSize"] === 14?<Icon name="check" size={16} color="limegreen"/>:null}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={()=>this._handleChangeFont(16)}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>中</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                       <Text style={[styles.setupRowLabelText]}>{userPrefs["preferredFontSize"] === 16?<Icon name="check" size={16} color="limegreen"/>:null}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={()=>this._handleChangeFont(18)}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>大</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                       <Text style={[styles.setupRowLabelText]}>{userPrefs["preferredFontSize"] === 18?<Icon name="check" size={16} color="limegreen"/>:null}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>            
        )
    }
}

export default FontSwitcher
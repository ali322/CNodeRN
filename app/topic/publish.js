'use strict'

import React,{Component,View,Text,TouchableHighlight} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"

import {containerByComponent} from "../lib/redux-helper"
import {topicReducer} from "./reducer"
import {saveTopic} from "./action"

import styles from "./stylesheet/publish"

class Publish extends Component{
    renderNavigationBar(){
        const title = (
            <View style={styles.navigationBarTitle}>
                <Text style={styles.navigationBarTitleText}>回复</Text>
            </View>
        )
        const rightButton = (
            <TouchableHighlight style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>{}}>
                <Text style={styles.navigationBarButtonText}>发布</Text>
            </TouchableHighlight>
        )
        const leftButton = (
            <TouchableHighlight style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>Actions.pop()}>
            <Icon name="angle-left" size={25} color="#666"/>
            <Text style={styles.navigationBarButtonText}>取消</Text>
            </TouchableHighlight>
        )
        return <NavigationBar title={title} leftButton={leftButton} rightButton={rightButton} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    render(){
        return (
            <View style={styles.container}></View>
        )
    }
}

export default containerByComponent(Publish,topicReducer,{saveTopic})

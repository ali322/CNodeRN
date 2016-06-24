'use strict'

import React,{Component} from "react"
import {Text,View,StyleSheet} from "react-native"
import containerByComponent from "../../lib/redux-helper"
import {messageCountReducer} from "../reducer"
import {fetchMessageCount} from "../action"
import preferredThemer from "../theme"

const defaultStyles = StyleSheet.create({
    tabBarCounter:{
        position:"absolute",
        top:-3,
        left:24,
        paddingHorizontal:6,
        paddingVertical:2,
        borderRadius:10,
        backgroundColor:"red"
    },
    tabBarCounterText:{
        color:"#FFF",
        fontSize:12
    }
})

@preferredThemer(defaultStyles)
class MessageCounter extends Component{
    componentDidMount(){
        const {authentication} = this.props
        if(authentication){
            this.props.actions.fetchMessageCount(authentication.accessToken)
        }
    }
    render(){
        const {styles,count} = this.props
        if(count > 0){
            return (
                <View style={styles.tabBarCounter}><Text style={styles.tabBarCounterText}>{count}</Text></View>
            )
        }
        return null
    }
}


export default containerByComponent(MessageCounter,messageCountReducer,{fetchMessageCount})
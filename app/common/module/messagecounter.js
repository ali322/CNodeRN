'use strict'

import React,{Component,Text,View,StyleSheet} from "react-native"
import containerByComponent from "../../lib/redux-helper"
import {messageCountReducer} from "../reducer"
import {fetchMessageCount} from "../action"

class MessageCounter extends Component{
    componentDidMount(){
        global.storage.getItem("user").then((user)=>{
            if(user){
                this.props.fetchMessageCount(user.accessToken)
            }
        })  
    }
    render(){
        if(this.props.count > 0){
            return (
                <View style={styles.tabBarCounter}><Text style={styles.tabBarCounterText}>{this.props.count}</Text></View>
            )
        }
        return null
    }
}

const styles = StyleSheet.create({
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

export default containerByComponent(MessageCounter,messageCountReducer,{fetchMessageCount})
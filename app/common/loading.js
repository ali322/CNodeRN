'use strict'

import React,{Component,View,StyleSheet} from "react-native"
import Spinner from "./spinner"

export default class Loading extends Component{
    render(){
        return (
            <View style={styles.loading}><Spinner size={30} name="spinner" color="#888"/></View>
        )
    }
}

const styles = StyleSheet.create({
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
'use strict'

import React,{Component,View,StyleSheet,ActivityIndicatorIOS,ProgressBarAndroid,Platform} from "react-native"

export default class Loading extends Component{
    render(){
        const spinner = Platform.OS === "ios"?<ActivityIndicatorIOS animating={true} {...this.props}/>:
        <ProgressBarAndroid {...this.props}/>
        return (
            <View style={styles.loading}>{spinner}</View>
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
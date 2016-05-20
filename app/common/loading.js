'use strict'

import React,{Component,View,StyleSheet,ActivityIndicatorIOS,ProgressBarAndroid,Platform} from "react-native"
import Spinner from "react-native-spinkit"

export default class Loading extends Component{
    render(){
        // const spinner = Platform.OS === "ios"?<ActivityIndicatorIOS animating={true} {...this.props}/>:
        // <ProgressBarAndroid {...this.props}/>
        const spinner = <Spinner type="FadingCircleAlt" size={20}/>
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
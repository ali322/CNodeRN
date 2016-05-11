'use strict'

import React,{Component,View,ActivityIndicatorIOS,ProgressBarAndroid,Platform} from "react-native"

class Spin extends Component{
    render(){
        console.log(Platform.OS)
        if(Platform.OS === "ios"){
            return <ActivityIndicatorIOS animating={true} {...this.props}/>
        }else{
            return <ProgressBarAndroid {...this.props}/>
        }
    }
}


export default Spin
'use strict'

import React,{Component,NavigationExperimental,PropTypes,View,Text,TouchableOpacity} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import {connect} from "react-redux"
import containerByComponent,{configureStore,createContainer} from "./lib/redux-helper"
import Router from "./common/navigation/router"

class First extends Component{
    render(){
        return <View>
        <Text>First</Text>
        <TouchableOpacity onPress={()=>this.props.navigationActions.pushScene("second",{flag:1})}>
            <Text>next</Text>
        </TouchableOpacity>
        </View>
    }
}

class Second extends Component{
    render(){
        console.log("this.props",this.props)
        return <View><Text>Second</Text><TouchableOpacity onPress={()=>this.props.navigationActions.popScene()}><Text>back</Text></TouchableOpacity></View>
    }
}


export default class extends Component{
    render(){
        const scenes = [
            {key:"first",component:First,initial:true},
            {key:"second",component:Second}
        ]
        return <Router scenes={scenes}/>
    }
}
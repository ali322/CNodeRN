'use strict'

import React,{Component,NavigationExperimental,PropTypes,View,Text,TouchableOpacity,StyleSheet} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import {connect} from "react-redux"
import containerByComponent,{configureStore,createContainer} from "./lib/redux-helper"
import Router from "./common/navigation/router"

class First extends Component{
    render(){
        return <View style={styles.container}>
        <Text>First</Text>
        <TouchableOpacity onPress={()=>this.props.navigationActions.pushScene("second",{flag:1})}>
            <Text>next</Text>
        </TouchableOpacity>
        </View>
    }
}

class Second extends Component{
    render(){
        // console.log("this.props",this.props)
        return <View  style={styles.container}><Text>Second</Text>
        <TouchableOpacity onPress={()=>this.props.navigationActions.popScene()}><Text>back</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigationActions.pushScene("tabs")}><Text>next</Text></TouchableOpacity>
        </View>
    }
}

class Third extends Component{
    render(){
        console.log("this.props",this.props)
        return <View style={styles.container}><Text>Third</Text>
        <TouchableOpacity onPress={()=>this.props.navigationActions.popScene()}><Text>back</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigationActions.pushScene("four")}><Text>next</Text></TouchableOpacity>
        </View>
    }
}
class Four extends Component{
    render(){
        console.log("this.props",this.props)
        return <View style={styles.container}><Text>Four</Text><TouchableOpacity onPress={()=>this.props.navigationActions.popScene("four")}><Text>back</Text></TouchableOpacity></View>
    }
}



export default class extends Component{
    render(){
        const scenes = [
            {key:"first",component:First,initial:true},
            {key:"second",component:Second},
            {tabbar:true,key:"tabs",items:[
                {key:"tab_1",iconName:"coffee",children:[
                    {key:"third",component:Third},
                    {key:"four",component:Four}
                ]}
            ]}
        ]
        // const scenes = {
        //     "first":{
        //         component:First,initial:true
        //     },
        //     "second":{
        //         component:Second
        //     },
        //     "tabs":{
        //         tabbar:true,items:[
        //             {"third":{
        //                 component:Third
        //             }}
        //         ]
        //     },
        //     "four":{
        //         component:"four"
        //     }
        // }
        return <Router scenes={scenes}/>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#DDD'
    }
})
'use strict'

import React,{Component,NavigationExperimental,PropTypes,View,Text,TouchableOpacity,StyleSheet} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import {connect} from "react-redux"
import containerByComponent,{configureStore,createContainer} from "./lib/redux-helper"
import Router,{Scene} from "./common/navigation/router"

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
        <TouchableOpacity onPress={()=>this.props.navigationActions.popScene("second")}><Text>back</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigationActions.pushScene("third")}><Text>next</Text></TouchableOpacity>
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
            {tabbar:true,key:"tabs",items:[
                {key:"tab_1",iconName:"coffee",children:[
                    {key:"third",component:Third},
                ]},
                {key:"tab_1",iconName:"user",children:[
                    {key:"four",component:Four}
                ]}
            ]},
            {key:"first",component:First,initial:true},
            {key:"second",component:Second}
        ]
        return (
            <Router>
                <Scene tabbar={true} key="tabs">
                    <Scene key="tab_1" iconName="coffee">
                        <Scene key="first" component={First}></Scene>
                        <Scene key="second" component={Second}></Scene>
                        <Scene key="third" component={Third}/>
                    </Scene>
                    <Scene key="tab_2" iconName="user">
                        <Scene key="four" component={Four}/>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#DDD'
    }
})
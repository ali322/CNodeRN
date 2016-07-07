'use strict'

import React,{Component} from "react"
import {View,Text,TouchableOpacity} from "react-native"
import test from "ava"
import {shallow} from "enzyme"
import Topics from "../../topic/topics"

class Todo extends Component{
    render(){
        return <View><Text>Todo</Text>
        <TouchableOpacity><Text>test</Text></TouchableOpacity>
        </View>
    }
}

test("component topics",t=>{
    const wrapper = shallow(<Topics/>)
    // wrapper.find("TouchableOpacity").simulate("click")
    t.true(wrapper.length === 1)
})
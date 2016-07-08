'use strict'

import React,{Component} from "react"
import {View,Text,TouchableOpacity} from "react-native"
import test from "ava"
import {shallow} from "enzyme"
import sinon from "sinon"
import {Topics} from "../../topic/topics"
import {topicsReducer} from "../../topic/reducer"
import {configureStore} from "../../lib/redux-helper"

function setup(){
    const store = configureStore(topicsReducer)
    const state = store.getState()
    let props = {
        styles:{},
        styleConstants:{},
        userPrefs:{},
        ...state
    }
    sinon.spy(Topics.prototype,"render")
    let wrapper = shallow(<Topics {...props}/>)
    return {
        wrapper
    }
}

test("component topics",t=>{
    const {wrapper} = setup()
    t.is(Topics.prototype.render.callCount,1,"should render once")
    // wrapper.setProps({
    //     renderRow
    // })
    // wrapper.find("TouchableOpacity").simulate("click")
    t.true(wrapper.find("Alert").length === 1)
})
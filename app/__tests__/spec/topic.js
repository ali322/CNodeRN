'use strict'

import React,{Component} from "react"
import {View,Text,TouchableOpacity} from "react-native"
import test from "ava"
import {shallow} from "enzyme"
import sinon from "sinon"
import {Topics} from "../../topic/topics"
import  * as actions from "../../topic/action"
import {topicsReducer} from "../../topic/reducer"
import {configureStore} from "../../lib/redux-helper"

function setup(){
    const store = configureStore(topicsReducer)
    const state = store.getState()
    let props = {
        styles:{},
        styleConstants:{},
        userPrefs:{},
        actions,
        ...state
    }
    sinon.spy(Topics.prototype,"render")
    sinon.spy(Topics.prototype,"componentDidMount")
    let wrapper = shallow(<Topics {...props}/>)
    return {wrapper,store}
}

let wrapper,store
test.before(t=>{
    const setupResult = setup()
    wrapper = setupResult.wrapper
    store = setupResult.store
})

test("topics should render once",t=>{
    t.is(Topics.prototype.render.callCount,1,"render error")
    // wrapper.setProps({
    //     renderRow
    // })
    t.true(wrapper.find("Alert").length === 1)
})

test("topics searchActive should toggled",t=>{
    const el = wrapper.instance()
    el.toggleSearchActive()
    t.is(wrapper.state().searchBarActive,true)
})
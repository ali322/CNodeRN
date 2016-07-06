'use strict'

import React,{Component} from "react"
import test from "ava"
import {shallow} from "enzyme"
import Topics from "../../topic/topics"

test("component topics",t=>{
    const wrapper = shallow(<Topics />)
    t.is(1,wrapper.length,"its length should be 1")
})
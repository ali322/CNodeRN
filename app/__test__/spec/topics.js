'use strict'

import React from "react-native"
import {shallow} from "enzyme"
import {expect} from "chai"
import Topics from "../../topic/topics"

describe("<Topics/>",()=>{
    it("should render topics",()=>{
        const wrapper = shallow(<Topics/>)
        expect(wrapper.length).to.equal(1)
    })
})
'use strict'

import React,{Component} from "react"
import shallowEqual from "shallowequal"

export default OriginComponent=>class PureRender extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return !shallowEqual(nextProps,this.props)
    }
    render(){
        return <OriginComponent {...this.props}/>
    }
}
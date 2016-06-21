'use strict'

import React,{Component} from "react"
import {WebView,Dimensions} from "react-native"

class WebContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            height:props.height || 0
        }
    }
    _handleNavigationStateChange(navState){
        if(this.state.height !== navState.title){
            this.setState({
                height:Number(navState.title)
            })
        }
        this.props.onNavigationStateChange()
    }
    render(){
        let {source,autoHeight,style,innerCSS} = this.props
        
        if(!source){
            return null
        }
        const screenWidth = Dimensions.get("window").width
        const scriptText = `<script>window.location.hash = 1;document.title = document.body.clientHeight;</script>`
        const styleText = `<style>${innerCSS}</style>`
        if(source.html && autoHeight){
            source = Object.assign({},source,{
                html: source.html + scriptText+styleText
            })
        }
        return <WebView source={source} 
        style={[style,autoHeight?{height:this.state.height}:null]} 
        automaticallyAdjustContentInsets={false} 
        scrollEnabled={!autoHeight} onNavigationStateChange={this._handleNavigationStateChange.bind(this)}/>
    }
}

WebContainer.defaultProps = {
    innerCSS:"",
    autoHeight:true,
    onNavigationStateChange:()=>{}
}

export default WebContainer
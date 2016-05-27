'use strict'

import React,{Component,WebView} from "react-native"

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
        let {source,autoHeight,style} = this.props
        
        if(!source){
            return null
        }
        const script = '<script>window.location.hash = 1;document.title = document.height;</script>'
        if(source.html && autoHeight){
            source = Object.assign({},source,{
                html:source.html + script
            })
        }
        return <WebView source={source} 
        style={[style,autoHeight?{height:this.state.height}:null]} 
        automaticallyAdjustContentInsets={false} 
        scrollEnabled={!autoHeight} onNavigationStateChange={this._handleNavigationStateChange.bind(this)}/>
    }
}

WebContainer.defaultProps = {
    autoHeight:true,
    onNavigationStateChange:()=>{}
}

export default WebContainer
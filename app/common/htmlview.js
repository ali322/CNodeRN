'use strict'

import React, {Component,Text,StyleSheet,Image,Dimensions,Platform} from "react-native"
import HtmlView from "react-native-htmlview"
import _ from "lodash"

class ResizableImage extends Component{
    constructor(props){
        super(props)
        this.state = {
            width:props.style.width || 1,
            height:props.style.height || 1
        }
    }
    componentDidMount(){
        if(Platform.OS === "ios"){
            Image.getSize(this.props.source.uri,(w,h)=>{
                this.setState({
                    width:w,height:h
                })
            })
        }else{
            this.setState({
                width:200,
                height:200
            })
        }
    }
   render(){
       const {width,height} = this.state
       const {maxImageWidth} = this.props
       const finalSize = {}
       if(this.state.width > maxImageWidth){
           finalSize.width = maxImageWidth
           let ratio = maxImageWidth / this.state.width
           finalSize.height = this.state.height * ratio
       }
       const _styles = Object.assign({backgroundColor:"transparent"},this.props.style,this.state,finalSize)
       let _source = Object.assign({},this.props.source,{width,height},finalSize.width && finalSize.height ? finalSize:null)
       return <Image source={_source} style={_styles}/>
   } 
}

ResizableImage.defaultProps = {
    style:{}
}


export default class HTMLView extends Component {
    render() {
        const _renderNode = (node,index)=>{
            if(node.name === "img" && node.type === "tag"){
                let imgSrc = node.attribs.src
                if (/^\/\/.*/.test(imgSrc)) {
                    imgSrc = 'http:' + imgSrc
                }
                // if(/.*\.gif$/.test(imgSrc)){
                //     return null
                // }
                // if(/.*\.(jpg|jpeg|bmp)$/.test(imgSrc) === false){
                //     return null
                // }
                const _styles = {
                    resizeMode:Image.resizeMode.cover
                }
                return <ResizableImage source={{uri:imgSrc}} key={index} 
                style={_styles} maxImageWidth={this.props.maxImageWidth}/>
            }
        }
        return (
            <HtmlView value={this.props.value} stylesheet={styles} renderNode={_renderNode}/>
        )
    }
}

HTMLView.defaultProps = {
    value: "",
    maxImageWidth:Dimensions.get("window").width
}

const styles = StyleSheet.create({
    a: {
        fontWeight: "300"
    }
})
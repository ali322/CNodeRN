'use strict'

import React, {Component,Text,StyleSheet,Image} from "react-native"
import HtmlView from "react-native-htmlview"
import _ from "lodash"

export default class HTMLView extends Component {
    _onImageLoadEnd(uri,imgId){
        Image.getSize && Image.getSize(uri, (w, h)=> {
            this._images[imgId].setNativeProps({
                style:{
                    width:w,
                    height:h
                }
            })
        })
    }
    _renderNode(node, index, list) {
        if(node.name === "img"){
            let imgSrc = node.attribs.src
            const imgId = _.uniqueId("img_")
            if (/^\/\/.*/.test(imgSrc)) {
                imgSrc = 'http:' + imgSrc
            }
            if(/.*\.gif$/.test(imgSrc)){
                return null
            }
            if(/.*\.(jpg|jpeg|bmp)$/.test(imgSrc) === false){
                return null
            }
            return <Image source={{uri:imgSrc}} style={styles.img} 
            ref={view=>this._images[imgId]=view} 
            key={imgId} onLoadEnd={this._onImageLoadEnd.bind(this, imgSrc, imgId)}/> 
        }
    }
    render() {
        return (
            <HtmlView value={this.props.html} stylesheet={styles} renderNode={this._renderNode.bind(this) }/>
        )
    }
}

HTMLView.defaultProps = {
    html: ""
}

const styles = StyleSheet.create({
    a: {
        fontWeight: "300"
    },
    img:{
        width:100,
        height:100,
        resizeMode: Image.resizeMode.cover
    }
})
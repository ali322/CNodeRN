'use strict'

import React,{Component,StyleSheet} from "react-native"
import HtmlView from "react-native-htmlview"

export default class HTMLView extends Component{
    render(){
        return (
            <HtmlView value={this.props.html} stylesheet={styles}/>
        )
    }
}

HTMLView.defaultProps = {
    html:""
}

const styles = StyleSheet.create({
    a:{
        fontWeight:"300"
    }
})
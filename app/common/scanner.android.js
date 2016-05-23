'use strict'

import React,{Component,StyleSheet,Dimensions} from "react-native"
import BarcodeScanner from "react-native-barcodescanner"

class Scanner extends Component{
    static defaultProps = {
        handleBarCodeRead:()=>{}
    }
    
    render(){
        return (
            <BarcodeScanner style={styles.preview} onBarCodeRead={this.props.handleBarCodeRead}/>
        )
    }
}

const styles = StyleSheet.create({
    preview:{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})

export default Scanner
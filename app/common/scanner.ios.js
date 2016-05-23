'use strict'

import React,{Component,StyleSheet,Dimensions,View,Text} from "react-native"
import Camera from "react-native-camera"

class Scanner extends Component{
    static defaultProps = {
        handleBarCodeRead:()=>{}
    }
    
    render(){
        return (
            <Camera style={styles.preview} aspect={Camera.constants.Aspect.fill}
                onBarCodeRead={this.props.handleBarCodeRead}>
                    <View style={styles.scanner}>
                        <View key={1} style={[styles.borderLeftTop, styles.borderBox]}></View>
                        <View key={2} style={[styles.borderRightTop, styles.borderBox]}></View>
                        <View key={3} style={[styles.borderLeftBottom, styles.borderBox]}></View>
                        <View key={4} style={[styles.borderRightBottom, styles.borderBox]}></View>
                    </View>
                    <View style={styles.scannerBreif}>
                        <Text style={styles.scannerHint}>请将二维码放到框内</Text>
                    </View>
            </Camera>
        )
    }
}


const styles = StyleSheet.create({
    preview:{
        flex: 1,
        flexDirection:"column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    scannerBreif:{
        backgroundColor:"rgba(0,0,0,0.8)",
        width:Dimensions.get("window").width,
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    scanner:{
      width:250,
      height:250,
      marginTop:100,
      marginBottom:30,
      backgroundColor:"transparent"
    },
    scannerHint:{
      marginTop:40,
      color: 'rgba(255,255,255,0.7)',
      fontSize:18,
      backgroundColor:"transparent" 
    },
    borderBox: {
		position: 'absolute',
		borderWidth: 2,
		height: 35,
		width: 35
	},
	borderLeftTop: {
		borderColor: 'transparent',
		borderLeftColor: 'rgba(255,255,255,0.6)',
		borderTopColor: 'rgba(255,255,255,0.6)',
		left: 0,
		top: 0
	},
	borderRightTop: {
		borderColor: 'transparent',
		borderRightColor: 'rgba(255,255,255,0.6)',
		borderTopColor: 'rgba(255,255,255,0.6)',
		right: 0,
		top: 0
	},
	borderLeftBottom: {
		borderColor: 'transparent',
		borderLeftColor: 'rgba(255,255,255,0.6)',
		borderBottomColor: 'rgba(255,255,255,0.6)',
		left: 0,
		bottom: 0
	},
	borderRightBottom: {
		borderColor: 'transparent',
		borderRightColor: 'rgba(255,255,255,0.6)',
		borderBottomColor: 'rgba(255,255,255,0.6)',
		right: 0,
		bottom: 0
	}
})

export default Scanner

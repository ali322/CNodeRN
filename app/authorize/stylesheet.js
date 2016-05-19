'use strict'

import {StyleSheet,Platform} from "react-native"

const styles = {
    container:{
        flex:1,
        backgroundColor:"#FFF"
    },
    mineBreif:{
        height:150,
        backgroundColor:"#FFF",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    mineAuthorize:{
        paddingHorizontal:8,
        paddingVertical:10,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    mineAuthorizeQrcode:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    mineAuthorizeText:{
        fontSize:14,
        paddingVertical:4,
        color:"#333" 
    },
    mineAuthorizeSubtext:{
      fontSize:13,
      color:"#666"  
    }
}

const stylesForIOS = {}

const stylesForAndroid = {}

export default StyleSheet.create(Object.assign({},styles,
    Platform.OS === "android"?stylesForAndroid:null,
    Platform.OS === "ios"?stylesForIOS:null
))
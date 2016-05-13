'use strict'

import {StyleSheet,Platform} from "react-native"
import navigationbar from "../../common/stylesheet/navigationbar"
import modal from "../../common/stylesheet/modal"

const styles = {
    ...navigationbar,
    ...modal,
    container:{
        flex:1,
        backgroundColor:"#FFF"
    },
    publishForm:{
        flex:1
    },
    publishRow:{
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:8,
      paddingVertical:6,
      borderBottomColor:"#DDD",
      borderBottomWidth:0.5 
    },
    publishLabel:{
      fontSize:15,
      width:50,
      textAlign:"center" 
    },
    publishInput:{
        paddingHorizontal:8,
        // paddingVertical:10,
        flex:1
    },
    publishTextInput:{
        height:25,
        fontSize:15
    },
    publishPickerInput:{
      flexDirection:"row",
      alignItems:"center"  
    },
    publishPickerValue:{
        fontSize:15,
        flex:1,
        color:"#CCC"
    },
    pickerWrap:{
      borderTopWidth:0.5,
      borderColor:"#DDD",
      backgroundColor:"#F1F1F1" 
    },
    publishArea:{
        flex:1,
        paddingHorizontal:8,
        paddingVertical:8,
        borderTopWidth:8,
        borderColor:"#DDD"  
    },
    publishTextArea:{
        fontSize:15,
        flex:1
        // paddingHorizontal:8,
        // paddingVertical:8
    }
}

const stylesForAndroid = {}
const stylesForIOS = {}

export default StyleSheet.create(Object.assign({},styles,
    Platform.OS === "ios"?stylesForIOS:null,
    Platform.OS === "android"?stylesForAndroid:null
))
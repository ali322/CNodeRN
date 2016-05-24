'use strict'

import {StyleSheet,Platform} from "react-native"

const styles = {
    container:{
        flex:1,
        backgroundColor:"#F1F1F1"
    },
    navigationBarButton:{
        marginRight:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:50
    },
    navigationBarButtonText:{
        fontSize:16,
        color:"#666"
        // paddingLeft:3 
    },
    setupPanel:{
        backgroundColor:"#FFF",
        marginVertical:8
    },
    setupRow:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderColor:"#DDD",
        paddingHorizontal:12,
        paddingVertical:15
    },
    setupRowLabel:{
        flex:1
    },
    setupRowLabelText:{
        fontSize:15,
        color:"#333"
    },
    setupRowContent:{
        flex:3
    },
    setupRowContentText:{
        fontSize:13,
        color:"#666"
    },
    setupAccessory:{
        width:60,
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    setupAccessoryText:{
        color:"#666",
        fontSize:12
    }
}

const stylesForIOS = {}
const stylesForAndroid = {}

export default StyleSheet.create(Object.assign({},styles,
    Platform.OS === "ios"?stylesForIOS:null,
    Platform.OS === "android"?stylesForAndroid:null
))
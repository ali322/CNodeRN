'use strict'

import {StyleSheet,Platform} from "react-native"
import navigationBar from "../../common/stylesheet/navigationbar"

const styles = {
    ...navigationBar,
    container:{
        flex:1,
        backgroundColor:"#F1F1F1"
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
    }
}

const stylesForIOS = {}
const stylesForAndroid = {}

export default StyleSheet.create(Object.assign({},styles,
    Platform.OS === "ios"?stylesForIOS:null,
    Platform.OS === "android"?stylesForAndroid:null
))
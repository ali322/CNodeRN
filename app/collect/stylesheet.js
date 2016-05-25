'use strict'
import {StyleSheet,Platform} from "react-native"
import listview from "../common/stylesheet/listview"

const styles = {
    ...listview,
    container:{
        flex:1,
        backgroundColor:"#FFF",
        marginBottom:49
    },
    topicCell:{
        flex: 1,
        padding: 10,
        backgroundColor:"#FFF",
        flexDirection:"column"
    },
    topicImage:{
        width:35,
        height:35,
        borderRadius:5
    },
    topicBreif:{
        flex:1,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"flex-start"
    },
    topicSubtitle:{
        paddingHorizontal:8,
        flex:1
    },
    topicSubtitleText:{
        fontSize:13,
        lineHeight:20
    },
    topicMintitle:{
        flexDirection:"row",
        alignItems:"center"
    },
    topicMintitleText:{
        fontSize:12,
        color:"#999",
        lineHeight:15
    },
    topicTag:{
        paddingHorizontal:8,
        paddingVertical:2,
        backgroundColor:"#EFEFEF",
        borderRadius:3,
        marginLeft:8
    },
    topicTagText:{
        fontSize:12,
        color:"#666"
        // lineHeight:15
    },
    topicAccessory:{
        // width:50
        paddingHorizontal:5
    },
    topicStatic:{
      fontSize:13,
      color:"#666"  
    },
    topicReply:{
    //   marginRight:8,
      color:"deeppink",
      fontSize:14,
      fontWeight:"700"  
    },
    topicTitle:{
        // paddingHorizontal:8,
        paddingVertical:5
    },
    topicTitleText:{
      fontSize:15  
    }
}

const stylesForIOS = {}

const stylesForAndroid = {}

export default StyleSheet.create(Object.assign({},styles,
    Platform.OS === "ios"?stylesForIOS:null,
    Platform.OS === "android"?stylesForAndroid:null
))
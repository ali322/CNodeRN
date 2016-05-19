'use strict'

import {StyleSheet, Platform} from "react-native"
import listview from "../../common/stylesheet/listview"
import modal from "../../common/stylesheet/modal"

const styles = {
    ...listview,
    ...modal,
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
    navigationBarTitle:{
        marginVertical:Platform.OS === "ios"?8:6,
        flexDirection:"row",
        alignItems:"center"
    },
    navigationBarTitleText:{
        fontSize:16,
        marginRight:8
    },
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
      color:"#333",
      fontSize:14,
      fontWeight:"700"  
    },
    topicTitle:{
        // paddingHorizontal:8,
        paddingVertical:5
    },
    topicTitleText:{
      fontSize:15  
    },
    modalRow:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        // lineHeight:20,
        paddingVertical:8
    },
    modalRowText:{
        fontSize:16
    },
    modalSelectedRowText:{
        color:"blue"
    },
    modalCancelRow:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        // lineHeight:20,
        paddingVertical:10,
        borderTopWidth:0.5,
        borderColor:"#DDD"
    }
}

const styleForAndroid = {}

const styleForIOS = {}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))
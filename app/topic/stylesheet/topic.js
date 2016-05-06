'use strict'

import {StyleSheet, Platform} from "react-native"
import navigationbar from "../../common/stylesheet/navigationbar"

const styles = {
    ...navigationbar,
    container:{
        flex:1,
        backgroundColor:"#FFF"
    },
    topicImage:{
        width:35,
        height:35,
        borderRadius:5
    },
    topicContent:{
      paddingVertical:10  
    },
    topicBreif:{
        paddingHorizontal:8,
        // flex:1,
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
    topicMintitleText:{
        fontSize:12,
        color:"#999",
        lineHeight:15
    },
    topicBadge:{
        width:50,
        paddingHorizontal:8,
        paddingVertical:4,
        backgroundColor:"#F8F8F8",
        borderRadius:3
    },
    topicBadgeText:{
        fontSize:12,
        color:"#666"
        // lineHeight:15
    },
    topicTitle:{
        paddingHorizontal:8,
        paddingVertical:12,
        borderColor:"#DDD",
        borderBottomWidth:0.5
    },
    topicTitleText:{
      fontSize:15  
    },
    topicContent:{
        paddingVertical:8,
        paddingHorizontal:8
    },
    topicContentWeb:{
        flex:1,
        height:300
    }
}

const styleForAndroid = {}

const styleForIOS = {}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))
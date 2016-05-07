'use strict'

import {StyleSheet, Platform} from "react-native"
import listview from "../../common/stylesheet/listview"
import navigationbar from "../../common/stylesheet/navigationbar"
import modal from "../../common/stylesheet/modal"

const styles = {
    ...listview,
    ...navigationbar,
    ...modal,
    navigationBarTitleText:{
      ...navigationbar.navigationBarTitleText,
      marginRight:8  
    },
    container:{
        flex:1,
        backgroundColor:"#FFF",
        marginBottom:49
    },
    listCell:{
      ...listview.listCell,
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
        // paddingHorizontal:8,
        paddingVertical:5
    },
    topicTitleText:{
      fontSize:15  
    },
    modalRow:{
        // lineHeight:20,
        paddingVertical:8
    },
    modalRowText:{
        fontSize:16
    },
    modalSelectedRowText:{
        color:"blue"
    }
}

const styleForAndroid = {}

const styleForIOS = {}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))
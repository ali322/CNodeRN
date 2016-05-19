'use strict'

import {StyleSheet, Platform} from "react-native"

const styles = {
    container:{
        flex:1,
        backgroundColor:"#FFF"
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
    topicImage:{
        width:35,
        height:35,
        borderRadius:5
    },
    topicContent:{
    //   paddingVertical:10
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
    topicDesc:{
        paddingVertical:8,
        paddingHorizontal:8
    },
    topicContentWeb:{
        flex:1
    },
    topicComments:{
        paddingVertical:8,
        paddingHorizontal:8,
        borderTopWidth:8,
        borderColor:"#DDD"
    },
    topicCommentsStatus:{
        paddingHorizontal:8,
        color:"#666",
        fontSize:13,
        paddingBottom:8
    },
    topicCommentBreif:{
        flexDirection:"row",
        alignItems:"center"
    },
    topicCommentsList:{
      borderTopWidth:0.5,
      borderColor:"#DDD"  
    },
    topicComment:{
        paddingVertical:5,
        borderBottomWidth:0.5,
        paddingHorizontal:8,
        borderColor:"#DDD",
        overflow:"hidden"
    },
    topicCommentBadge:{
        paddingHorizontal:8,
        paddingVertical:4,
        marginRight:5
    },
    topicAgreeBadge:{
      flexDirection:"row",
      alignItems:"center"  
    },
    topicAgreeBadgeText:{
      fontSize:12,
      fontWeight:"700",
      color:"#AAA"  
    },
    replyWrap:{
       flex:1
    },
    replyInput:{
       paddingHorizontal:8,
       paddingVertical:10,
       fontSize:13,
       textAlignVertical:"top"
    //    flex:1
    }
}

const styleForAndroid = {}

const styleForIOS = {}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))
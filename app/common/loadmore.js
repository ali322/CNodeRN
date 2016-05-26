'use strict'

import React,{Component,View,Text,StyleSheet} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Spinner from "react-native-spinkit"

class LoadMore extends Component{
    render(){
        return (
            <View style={styles.loadMore}>
               {this.props.active?<Spinner isVisble={true} type="FadingCircle" size={13} color="rgba(0,0,0,0.3)"/>:
               <Icon name="arrow-upward" size={20} color="#AAA"/>}
               <Text style={styles.loadMoreText}>{this.props.active?"加载中":"上拉加载更多"}</Text>
            </View>
        )
    }
}

LoadMore.defaultProps = {
    active:false
}

const styles = StyleSheet.create({
    loadMore:{
        // backgroundColor:"#F7F7F7",
        flex:1,
        flexDirection:"row",
        height:30,
        justifyContent:"center",
        alignItems:"center"
    },
    loadMoreText:{
        paddingLeft:5,
        fontSize:13,
        color:"#AAA"
    },
    loadMoreIcon:{
        color:"#AAA"
    }
})

export default LoadMore
'use strict'

import React,{Component,Text,View,TextInput,TouchableOpacity,StyleSheet,Platform} from "react-native"

export default class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            keyword:""
        }
    }
    render(){
        const handleSearch = ()=>{
            this.props.onSearch(this.state.keyword)
        }
        return (
        <View style={styles.searchBar}>
        <View style={styles.searchBarInputWrap}>
            <TextInput style={styles.searchBarInput} ref="searchTextInput" placeholder="请输入搜索关键字" clearButtonMode="while-editing" 
            onChangeText={(keyword)=>this.setState({keyword})}/>
        </View>
        <TouchableOpacity style={styles.searchBarButton} onPress={this.state.keyword === ""?this.props.onClose:handleSearch}>
            <Text style={styles.searchBarButtonText}>{this.state.keyword === ""?"取消":"搜索"}</Text>
        </TouchableOpacity>
        </View> 
        )
    }
}

SearchBar.defaultProps = {
    active:false,
    onSearch:()=>{},
    onClose:()=>{}
}

const stylesForAll = {
    searchBar:{
        height:64,
        paddingTop:20,
        paddingHorizontal:8,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#FAFAFA",
        borderBottomWidth:0.5,
        borderBottomColor:"#DDD"
    },
    searchBarButton:{
        width:50,
        height:44,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    searchBarButtonText:{
        color:"#666"
    },
    searchBarInputWrap:{
        flex:1,
        paddingHorizontal:8,
        marginVertical:7,
        borderRadius:5,
        borderColor:"#DDD",
        backgroundColor:"#FDFDFD",
        borderWidth:0.5
    },
    searchBarInput:{
        fontSize:15,
        color:"#666"
    }
}

const stylesForAndroid = {
    searchBar:{
        ...stylesForAll.searchBar,
        height:44,
        paddingTop:0
    },
    searchBarInputWrap:{
        ...stylesForAll.searchBarInputWrap,
        paddingHorizontal:0,
        marginVertical:0
    },
    searchBarInput:{
        ...stylesForAll.searchBarInput,
        paddingHorizontal:8,
        paddingVertical:1,
        backgroundColor:"transparent"
    }
}

const stylesForIOS = {
    searchBarInputWrap:{
        ...stylesForAll.searchBarInputWrap,
        height:30
    }
}

const styles = StyleSheet.create(Object.assign({},stylesForAll,
    Platform.OS === "android"?stylesForAndroid:{},
    Platform.OS === "ios"?stylesForIOS:{}
))
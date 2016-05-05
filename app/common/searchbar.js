'use strict'

import React,{Component,Text,View,TextInput,TouchableOpacity,StyleSheet} from "react-native"

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
        <TextInput style={styles.searchBarInput} ref="searchTextInput" placeholder="请输入搜索关键字" clearButtonMode="while-editing" 
        onChangeText={(keyword)=>this.setState({keyword})}/>
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

const styles = StyleSheet.create({
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
        justifyContent:"center",
    },
    searchBarButtonText:{
        color:"#666"
    },
    searchBarInput:{
        flex:1,
        height:30,
        paddingHorizontal:8,
        marginVertical:7,
        borderRadius:5,
        borderColor:"#DDD",
        borderWidth:0.5,
        fontSize:15,
        color:"#666"
    }
})
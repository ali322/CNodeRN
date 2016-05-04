'use strict'

import React,{Component,View,Text,Image,ListView,Platform,TouchableOpacity,Animated,RefreshControl,TextInput,LayoutAnimation} from "react-native"
import {Actions} from "react-native-router-flux"
import NavigationBar from "react-native-navbar"
import Icon from "react-native-vector-icons/FontAwesome"
import {containerByComponent} from "../lib/redux-helper"

import {topicsReducer} from "./reducer"
import {fetchTopics} from "./action"

import LoadMore from "../common/loadmore"
import Loading from "../common/loading"
import SearchBar from "../common/searchbar"

import styles from "./stylesheet/topics"

class Topics extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            refreshing:false,
            searchBarActive:false
        }
    }
    componentDidMount(){
        this.props.fetchTopics()
    }
    handleLoadMore(){
        this.props.fetchTopics("",this.props.pageIndex + 1)
    }
    handleRefresh(){
        this.props.fetchTopics()
    }
    handleSearch(){
        
    }
    toggleSearchActive(){
        this.setState({
            searchBarActive:!this.state.searchBarActive
        },()=>LayoutAnimation.spring())
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.topicsFetching && nextProps.topicsFetched){
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(nextProps.list)
            })
        }
    }
    renderNavigationBar(){
        const title = <View style={styles.navigationBarTitle}><Text style={styles.navigationBarTitleText}>全部</Text></View>
        const rightButton = (
            <TouchableOpacity style={styles.navigationBarButton} onPress={this.toggleSearchActive.bind(this)}>
            <Icon name="search" size={16} color="#999"/>
            </TouchableOpacity>
        )
        return <NavigationBar title={title} rightButton={rightButton} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    renderSearchBar(){
        return <SearchBar active={this.state.searchBarActive} onClose={this.toggleSearchActive.bind(this)}/>
    }
    renderRow(topic){
        return (
            <TouchableOpacity>
            <Animated.View style={[styles.listCell, {
                // opacity: this.state.rowScale,
                // transform: [{ scaleX: this.state.rowScale }]
            }]}>
                    <Image source={{uri:topic.author.avatar_url}} style={styles.cellImage}/>
                    <View style={styles.cellBreif}>
                    <Text style={styles.cellTitle}>{topic.title}</Text>
                    <Text style={styles.cellSubtitle}>{topic.create_at}</Text>
                    </View>
                    <Text style={styles.cellAccessory}>{topic.reply_count}/{topic.visit_count}</Text>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    render(){
        const threshold = (Platform.OS === "ios" ? 10 : -20)
        return (
            <View style={styles.container}>
            {this.state.searchBarActive?this.renderSearchBar():this.renderNavigationBar()}
            {this.props.list.length === 0 && this.props.topicsFetching ? <Loading />:(
            <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} 
            refreshControl={<RefreshControl refreshing={this.state.refreshing} title="加载中..." onRrefresh={this.handleRefresh.bind(this)}/>}
            onEndReached={this.handleLoadMore.bind(this)} onEndReachedThreshold={10} initialListSize={6}
            renderSeparator={(sectionId,rowId)=><View key={`${sectionId}-${rowId}`} style={styles.cellSeparator}/>}
            renderFooter={()=>this.props.list.length > 0?<LoadMore active={this.props.topicsFetching}/>:null}/>
            )}
            </View>
        )
    }
}

export default containerByComponent(Topics,topicsReducer,{fetchTopics},(state)=>state,{
    list:[],
    pageIndex:0,
    ...this.props
})
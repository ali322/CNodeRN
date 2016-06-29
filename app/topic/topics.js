'use strict'

import React,{Component} from "react"
import {View,Text,Image,ListView,Platform,Modal,TouchableOpacity,Animated,RefreshControl,TextInput,LayoutAnimation,StyleSheet} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import containerByComponent from "../lib/redux-helper"
import pureRender from "../lib/pure-render"

import {topicsReducer} from "./reducer"
import {fetchTopics,changeCategory,filterTopics} from "./action"

import LoadMore from "../common/component/loadmore"
import Loading from "../common/component/loading"
import SearchBar from "../common/module/searchbar"
import NavBar from "../common/component/navbar"
import Alert from "../common/component/alert"
import offlineDecorator from "../common/module/offline"

import defaultStyles from "./stylesheet/topics"
import preferredThemer from "../common/theme"


@preferredThemer(defaultStyles)
class Topics extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            refreshing:false,
            searchBarActive:false,
            modalActive:false
        }
    }
    componentDidMount(){
        const {categories,selectedCategory} = this.props
        if(categories[selectedCategory].list.length === 0){
            this.props.actions.fetchTopics()
        }else{
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(categories[selectedCategory].list)
            })
        }
    }
    handleLoadMore(){
        const {categories,selectedCategory} = this.props
        this.props.actions.fetchTopics(selectedCategory,categories[selectedCategory].pageIndex + 1)
    }
    handleRefresh(){
        this.props.actions.fetchTopics(this.props.selectedCategory)
    }
    handleSearch(keyword){
        this.props.actions.filterTopics(keyword)
    }
    toggleSearchActive(){
        this.setState({
            searchBarActive:!this.state.searchBarActive
        },()=>LayoutAnimation.spring())
    }
    toggleModalActive(){
        this.setState({
            modalActive:!this.state.modalActive
        })
    }
    handleCategoryChange(category){
        this.toggleModalActive()
        this.props.actions.changeCategory(category)
        this.props.actions.fetchTopics(category)
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.topicsFetching && nextProps.topicsFetched){
            const {categories,selectedCategory} = nextProps
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(categories[selectedCategory].list)
            })
        }
    }
    renderNavigationBar(){
        const {categories,selectedCategory,navigationActions,styles} = this.props
        const leftButton = (
            <Icon name="edit" size={22} color="#999"/>
        )
        const rightButton = (
            <Icon name="search" size={20} color="#999"/>
        )
        const title = (            
            <TouchableOpacity style={styles.navigationBarTitle} onPress={this.toggleModalActive.bind(this)}>
                <Text style={styles.navigationBarTitleText}>{categories[selectedCategory].name}</Text>
                <Icon name="angle-down" size={16} color="#999"/>
            </TouchableOpacity>
        )
        return <NavBar leftButton={leftButton} rightButton={rightButton} title={title} 
        onLeftButtonClick={()=>{
            if(!this.props.user){
                this._alert.alert("请先登录","登录",[
                    {text:"取消",style:"cancel"},
                    {text:"确定",onPress:()=>navigationActions.pushScene("login")}
                ])
            }else{
                navigationActions.pushScene("publish")
            }
        }} 
        onRightButtonClick={this.toggleSearchActive.bind(this)}
        userPrefs={this.props.userPrefs}/>
    }
    renderModal(){
        const {categories,selectedCategory,styles} = this.props
        return (
            <Modal animationType="none" visible={this.state.modalActive} transparent={true} 
            onRequestClose={this.toggleModalActive.bind(this)}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            {Object.keys(categories).map((v,i)=>{
                const category = categories[v]
                return <TouchableOpacity key={i} style={styles.modalRow} onPress={this.handleCategoryChange.bind(this,v)}>
                <Text style={[styles.modalRowText,v === selectedCategory?styles.modalSelectedRowText:null]}>{category.name}</Text>
                </TouchableOpacity>
            })}
                <TouchableOpacity style={styles.modalCancelRow} onPress={this.toggleModalActive.bind(this)}>
                    <Text style={[styles.modalRowText,{color:"red"}]}>取消</Text>
                </TouchableOpacity>
            </View>
            </View>
            </Modal>
        )
    }
    renderSearchBar(){
        return <SearchBar active={this.state.searchBarActive} onSearch={this.handleSearch.bind(this)} 
        onClose={this.toggleSearchActive.bind(this)} userPrefs={this.props.userPrefs}/>
    }
    renderRow(topic){
        const {styles} = this.props
        const {pushScene} = this.props.navigationActions
        let avatarURL = topic.author.avatar_url
        if (/^\/\/.*/.test(avatarURL)) {
            avatarURL = 'http:' + avatarURL
        }
        return (
            <TouchableOpacity onPress={()=>pushScene("topic",{id:topic.id})}>
            <Animated.View style={styles["topicCell"]}>
                    <View style={styles.topicBreif}>
                        <Image source={{uri:avatarURL}} style={styles.topicImage}/>
                        <View style={styles.topicSubtitle}>
                            <Text style={styles["topicSubtitleText"]}>{topic.author.loginname}</Text>
                            <View style={styles.topicMintitle}>
                                <Text style={styles.topicMintitleText}>{topic.create_at}</Text>
                                <View style={styles["topicTag"]}>
                                    <Text style={styles["topicTagText"]}>{topic.tab}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topicAccessory}>
                            <Text style={styles.topicStatic}><Text style={styles.topicReply}>{topic.reply_count}</Text> /{topic.visit_count}</Text>
                        </View>
                    </View>
                    <View style={styles.topicTitle}>
                        <Text style={styles.topicTitleText} numberOfLines={2}>{topic.title}</Text>
                    </View>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    render(){
        const threshold = (Platform.OS === "ios" ? 10 : -20)
        const {categories,selectedCategory,styles,styleConstants,userPrefs} = this.props
        const loadingColor = styleConstants.loadingColor
        return (
            <View style={styles.container}>
            {this.state.searchBarActive?this.renderSearchBar():this.renderNavigationBar()}
            {categories[selectedCategory].list.length === 0 && this.props.topicsFetching ? <Loading color={loadingColor}/>:(
            <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} 
            refreshControl={<RefreshControl refreshing={this.state.refreshing} 
            title="加载中..." 
            titleColor={loadingColor} tintColor={loadingColor} 
            onRrefresh={this.handleRefresh.bind(this)}/>}
            onEndReached={this.handleLoadMore.bind(this)} onEndReachedThreshold={10} initialListSize={6}
            renderSeparator={(sectionId,rowId)=><View key={`${sectionId}-${rowId}`} style={styles["cellSeparator"]}/>}
            renderFooter={()=>categories[selectedCategory].list.length > 0?
                <LoadMore active={this.props.topicsFetching} userPrefs={userPrefs}/>:null}/>
            )}
            {this.renderModal()}
            <Alert ref={view=>this._alert=view}/>
            </View>
        )
    }
}

export default containerByComponent(Topics,topicsReducer,{fetchTopics,changeCategory,filterTopics})
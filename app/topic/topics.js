'use strict'

import React,{Component,View,Text,Image,ListView,Platform,Modal,TouchableOpacity,Animated,RefreshControl,TextInput,LayoutAnimation} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import containerByComponent from "../lib/redux-helper"

import {topicsReducer} from "./reducer"
import {fetchTopics,changeCategory,filterTopics} from "./action"

import LoadMore from "../common/component/loadmore"
import Loading from "../common/component/loading"
import SearchBar from "../common/module/searchbar"
import NavBar from "../common/component/navbar"

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
        const {categories,selectedCategory} = this.props
        const leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>this.props.router.publish()}>
            <Icon name="edit" size={22} color="#999"/>
            </TouchableOpacity>
        )
        const rightButton = (
            <TouchableOpacity style={styles.navigationBarButton} onPress={this.toggleSearchActive.bind(this)}>
            <Icon name="search" size={20} color="#999"/>
            </TouchableOpacity>
        )
        const title = (            
            <TouchableOpacity style={styles.navigationBarTitle} onPress={this.toggleModalActive.bind(this)}>
                <Text style={styles.navigationBarTitleText}>{categories[selectedCategory].name}</Text>
                <Icon name="angle-down" size={16} color="#999"/>
            </TouchableOpacity>
        )
        return <NavBar leftButton={()=>leftButton} rightButton={()=>rightButton} title={()=>title}/>
    }
    renderModal(){
        const {categories,selectedCategory} = this.props
        return (
            <Modal animated={false} visible={this.state.modalActive} transparent={true} 
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
        onClose={this.toggleSearchActive.bind(this)}/>
    }
    renderRow(topic){
        return (
            <TouchableOpacity onPress={()=>this.props.router.topic({id:topic.id})}>
            <Animated.View style={[styles.topicCell, {
                // opacity: this.state.rowScale,
                // transform: [{ scaleX: this.state.rowScale }]
            }]}>
                    <View style={styles.topicBreif}>
                        <Image source={{uri:topic.author.avatar_url}} style={styles.topicImage}/>
                        <View style={styles.topicSubtitle}>
                            <Text style={styles.topicSubtitleText}>{topic.author.loginname}</Text>
                            <View style={styles.topicMintitle}>
                                <Text style={styles.topicMintitleText}>{topic.create_at}</Text>
                                <View style={styles.topicTag}><Text style={styles.topicTagText}>{topic.tab}</Text></View>
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
        const {categories,selectedCategory} = this.props
        return (
            <View style={styles.container}>
            {this.state.searchBarActive?this.renderSearchBar():this.renderNavigationBar()}
            {categories[selectedCategory].list.length === 0 && this.props.topicsFetching ? <Loading />:(
            <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} 
            refreshControl={<RefreshControl refreshing={this.state.refreshing} title="加载中..." onRrefresh={this.handleRefresh.bind(this)}/>}
            onEndReached={this.handleLoadMore.bind(this)} onEndReachedThreshold={10} initialListSize={6}
            renderSeparator={(sectionId,rowId)=><View key={`${sectionId}-${rowId}`} style={styles.cellSeparator}/>}
            renderFooter={()=>categories[selectedCategory].list.length > 0?<LoadMore active={this.props.topicsFetching}/>:null}/>
            )}
            {this.renderModal()}
            </View>
        )
    }
}

export default containerByComponent(Topics,topicsReducer,{fetchTopics,changeCategory,filterTopics})
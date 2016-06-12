'use strict'
import React,{Component,View,Text,ListView,TouchableOpacity,Animated,RefreshControl,Image} from "react-native"

import NavBar from "../common/component/navbar"
import Loading from "../common/component/loading"
import Anonymous from "../common/module/anonymous"

import containerByComponent from "../lib/redux-helper"
import {collectReducer} from "./reducer"
import {fetchUserCollect} from "./action"
import styles from "./stylesheet"
import preferredThemeByName from "../common/stylesheet/theme"

class UserCollect extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            refreshing:false,
            isLogined:false
        }
        this._preferredTheme = preferredThemeByName(props.userPrefs["preferredTheme"])
    }
    componentDidMount(){
        global.storage.getItem("user").then((user)=>{
            if(user){
                this.setState({isLogined:true})
                this.props.actions.fetchUserCollect(user.username)
            }
        })
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.collectFetching && nextProps.collectFetched){
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(nextProps.collects)
            })
        }
        if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
            this._preferredTheme = preferredThemeByName(nextProps.userPrefs["preferredTheme"])
        }
    }
    handleRefresh(){
        this.props.fetchUserCollect()
    }
    renderRow(topic){
        const {navigationActions} = this.props
        return (
            <TouchableOpacity onPress={()=>navigationActions.pushScene("topic",{id:topic.id})}>
            <Animated.View style={[styles.topicCell,this._preferredTheme["topicCell"],{
                // opacity: this.state.rowScale,
                // transform: [{ scaleX: this.state.rowScale }]
            }]}>
                    <View style={styles.topicBreif}>
                        <Image source={{uri:topic.author.avatar_url}} style={styles.topicImage}/>
                        <View style={styles.topicSubtitle}>
                            <Text style={[styles.topicSubtitleText,this._preferredTheme["topicSubtitleText"]]}>{topic.author.loginname}</Text>
                            <View style={styles.topicMintitle}>
                                <Text style={[styles.topicMintitleText]}>{topic.create_at}</Text>
                                <View style={[styles.topicTag,this._preferredTheme["topicTag"]]}>
                                    <Text style={[styles.topicTagText,this._preferredTheme["topicTagText"]]}>{topic.tab}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topicAccessory}>
                            <Text style={styles.topicStatic}><Text style={[styles.topicReply,this._preferredTheme["topicSubtitleText"]]}>{topic.reply_count}</Text> /{topic.visit_count}</Text>
                        </View>
                    </View>
                    <View style={styles.topicTitle}>
                        <Text style={[styles.topicTitleText,this._preferredTheme["topicSubtitleText"]]} numberOfLines={2}>{topic.title}</Text>
                    </View>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    render(){
        return (
            <View style={[styles.container,this._preferredTheme["container"]]}>
            <NavBar title="收藏的主题" leftButton={false} userPrefs={this.props.userPrefs}/>
            {!this.state.isLogined?<Anonymous />:this.props.collectFetching?<Loading />:(
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} 
                refreshControl={<RefreshControl refreshing={this.state.refreshing} title="加载中..." onRrefresh={this.handleRefresh.bind(this)}/>}
                renderSeparator={(sectionId,rowId)=><View key={`${sectionId}-${rowId}`} style={[styles.cellSeparator,this._preferredTheme["cellSeparator"]]}/>}/>
            )}
            </View>
        )
    }
}

export default containerByComponent(UserCollect,collectReducer,{fetchUserCollect})
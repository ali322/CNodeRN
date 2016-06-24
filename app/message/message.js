'use strict'

import React,{Component} from "react"
import {View,StyleSheet,Text,ListView,Image,Alert,TouchableOpacity} from "react-native"
import ScrollableTabView from "react-native-scrollable-tab-view"

import containerByComponent from "../lib/redux-helper"
import {messageReducer} from "./reducer"
import {fetchMessages,fetchMessageCount,markAllMessage} from "./action"
import Tabs from "../common/component/tabs"
import Loading from "../common/component/loading"
import Anonymous from "../common/module/anonymous"
import NavBar from "../common/component/navbar"
import HtmlRender from "../common/component/htmlrender"

import defaultStyles from "./stylesheet/message"
import preferredThemer from "../common/theme"

@preferredThemer(defaultStyles)
class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            unreadDataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=> r1 !== r2
            }),
            readDataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=> r1 !== r2
            }),
            isLogined:false
        }
    }
    componentDidMount(){
        const {authentication} = this.props
        if(authentication){
            this.setState({isLogined:true})
            this.props.actions.fetchMessages(authentication.accessToken)
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.messagesFetched && !nextProps.messagesFetching){
            this.setState({
                unreadDataSource:this.state.unreadDataSource.cloneWithRows(nextProps.messages.hasnot_read_messages),
                readDataSource:this.state.readDataSource.cloneWithRows(nextProps.messages.has_read_messages)
            })
        }
    }
    _renderMessage(message){
        const {styles,htmlStyles} = this.props
        return (
            <View style={styles.topicCell}>
                <View style={styles.cellRow}>
                    <Image source={{uri:message.author.avatar_url}} style={styles.cellImage}/>
                    <View style={styles.cellSubtitle}>
                        <Text style={styles.cellSubtitleText}>{message.author.loginname}</Text>
                        <Text style={styles.cellMintitleText}>{message.reply.create_at}</Text>
                    </View>
                    <TouchableOpacity style={styles.cellAccessory} 
                    onPress={()=>this.props.navigationActions.pushScene("reply",{id:message.topic.id,replyTo:{...message.reply,author:message.author}})}>
                    <Text style={styles.cellAccessoryText}>回复</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cellTitle}>
                    <Text style={styles.cellSubtitleText}>评论了<Text style={styles.repliedTopicTitle}>{message.topic.title}</Text></Text>
                </View>
                <View style={[styles.cellTitle]}>
                    <HtmlRender value={message.reply.content.replace(/(\n|\r)+$/g,"")} style={htmlStyles}/>
                </View>
            </View>
        )
    }
    _renderTimeline(){
        const {styles} = this.props
        const renderTabBar = ()=>{
            return (
                <Tabs style={styles.tab} 
                selectedStyle={styles.selectedTab}>
                    <Text style={styles.unselectedTab}>未读</Text>
                    <Text style={styles.unselectedTab}>已读</Text>
                </Tabs>
            )
        }
        return (
            <ScrollableTabView renderTabBar={renderTabBar}>
                <ListView dataSource={this.state.unreadDataSource} renderRow={this._renderMessage.bind(this)} 
                enableEmptySections={true} initialListSize={6}/>
                <ListView dataSource={this.state.readDataSource} renderRow={this._renderMessage.bind(this)} 
                enableEmptySections={true} initialListSize={6}/>
            </ScrollableTabView>
        )
    }
    render(){
        const {navigationActions,styles,styleConstants}= this.props
        return (
            <View style={styles.container}>
            <NavBar title="消息" leftButton={false} userPrefs={this.props.userPrefs}/>
            {!this.state.isLogined?<Anonymous toLogin={()=>navigationActions.pushScene("qrcode")}/>:this.props.messagesFetching?<Loading color={styleConstants.loadingColor}/>:this._renderTimeline()}
            </View>
        )
    }
}

export default containerByComponent(Message,messageReducer,{fetchMessages,fetchMessageCount,markAllMessage})
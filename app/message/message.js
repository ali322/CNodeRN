'use strict'

import React,{Component,View,StyleSheet,Text,ListView,Image} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import ScrollableTabView from "react-native-scrollable-tab-view"

import {containerByComponent} from "../lib/redux-helper"
import {messageReducer} from "./reducer"
import {fetchMessages,fetchMessageCount,markAllMessage} from "./action"
import Tabs from "../common/tabs"

import styles from "./stylesheet/message"

import fakeMessages from "./fake"

class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            unreadDataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=> r1 !== r2
            }),
            readDataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=> r1 !== r2
            })
        }
    }
    componentDidMount(){
        this.props.fetchMessages("01206bae-f6ed-42de-bd0e-3775776deaf9")
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.messagesFetched && !nextProps.messagesFetching){
            this.setState({
                unreadDataSource:this.state.unreadDataSource.cloneWithRows(fakeMessages.hasnot_read_messages),
                readDataSource:this.state.readDataSource.cloneWithRows(fakeMessages.has_read_messages)
            })
        }
    }
    _renderNavigationBar(){
        const title = (
            <View style={styles.navigationBarTitle}>
                <Text style={styles.navigationBarTitleText}>消息</Text>
            </View>
        )
        return <NavigationBar title={title} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    _renderMessage(message){
        return (
            <View>
                <View style={styles.cellRow}>
                    <Image source={{uri:message.author.avatar_url}} style={styles.cellImage}/>
                    <View style={styles.cellSubtitle}>
                        <Text style={styles.cellSubtitleText}>{message.author.loginname}</Text>
                        <Text style={styles.cellMintitleText}>{message.reply.create_at}</Text>
                    </View>
                    <View style={styles.cellAccessory}><Text style={styles.cellAccessoryText}>回复</Text></View>
                </View>
                <View style={styles.cellTitle}>
                    <Text style={styles.cellSubtitleText}>评论了<Text style={styles.repliedTopicTitle}>{message.topic.title}</Text></Text>
                </View>
                <View style={styles.cellTitle}>
                    <Text style={[styles.cellSubtitleText,styles.replyContent]}>{message.reply.content.replace(/\s/g,"")}</Text>
                </View>
            </View>
        )
    }
    _renderTimeline(){
        const renderTabBar = ()=>{
            return (
                <Tabs style={styles.tab} selectedStyle={styles.selectedTab}>
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
        return (
            <View style={styles.container}>
            {this._renderNavigationBar()}
            {this._renderTimeline()}
            </View>
        )
    }
}

export default containerByComponent(Message,messageReducer,{fetchMessages,fetchMessageCount,markAllMessage})
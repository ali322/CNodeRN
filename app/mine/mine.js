'use strict'

import React, {Component, View, Text, TouchableOpacity,Image,ListView,Animated} from "react-native"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"
import NavigationBar from "react-native-navbar"

import Tabs from "../common/tabs"
import {formatTime} from "../lib/helper"
import {containerByComponent} from "../lib/redux-helper"
import {fetchUser, authorizeByToken} from "./action"
import {userReducer} from "./reducer"

import styles from "./stylesheet/mine"

class Mine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "topic",
            topicDatasource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            replyDatasource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            })
        }
    }
    componentDidMount(){
        this.props.fetchUser("alsotang")
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userFetched && !nextProps.userFetching){
            this.setState({
                topicDatasource:this.state.topicDatasource.cloneWithRows(nextProps.user.recent_topics),
                replyDatasource:this.state.topicDatasource.cloneWithRows(nextProps.user.recent_replies)
            })
        }
    }
    renderBreif() {
        const {user} = this.props
        if (!user) {
            return (
                <View style={styles.mineBreif}>
                    <View style={styles.mineAuthorize}>
                        <TouchableOpacity style={styles.mineAuthorizeQrcode} onPress={()=>Actions.camera()}>
                            <Icon name="qrcode" size={30}/>
                            <Text style={{ paddingLeft: 8 }}>扫码登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.mineBreif}>
                <View style={styles.mineAuthorize}>
                    <Image source={{uri:user.avatar_url}} style={styles.mineAvatar}/>
                    <Text style={styles.mineAuthorizeText}>{user.loginname}</Text>
                    <Text style={[styles.mineAuthorizeText,styles.mineAuthorizeSubtext]}>注册时间: <Text>{formatTime(user.create_at)}</Text></Text>
                </View>
            </View>
        )
    }
    renderNavigationBar() {
        const title = (
            <View style={styles.navigationBarTitle}>
                <Text style={styles.navigationBarTitleText}>我的</Text>
            </View>
        )
        const rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton, { marginLeft: 5 }]} onPress={() => { } }>
                <Icon name="cog" size={20} color="#999"/>
            </TouchableOpacity>
        )
        return <NavigationBar title={title} rightButton={rightButton} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    renderTopicRow(topic){
        const {user} = this.props

        return (
            <TouchableOpacity onPress={()=>Actions.topic({id:topic.id})}>
            <Animated.View style={[styles.listCell, {
                // opacity: this.state.rowScale,
                // transform: [{ scaleX: this.state.rowScale }]
            }]}>
                    <View style={styles.topicBreif}>
                    <Image source={{uri:user.avatar_url}} style={styles.topicImage}/>
                    <View style={styles.topicSubtitle}>
                        <Text style={styles.topicSubtitleText}>{user.loginname}</Text>
                        <Text style={styles.topicMintitleText}>{topic.last_reply_at}</Text>
                    </View>
                    </View>
                    <View style={styles.topicTitle}>
                        <Text style={styles.topicTitleText} numberOfLines={2}>{topic.title}</Text>
                    </View>
            </Animated.View>
            </TouchableOpacity>
        )
    }
    renderTrends() {
        const {user} = this.props
        if(!user){
            return null
        }
        let trendsContent = (
            <View style={styles.mineTrendsContent}>
            <ListView dataSource={this.state.topicDatasource} renderRow={this.renderTopicRow.bind(this)} style={{backgroundColor:"red"}}
            renderSeparator={(sectionId,rowId)=><View key={`${sectionId}-${rowId}`} style={styles.cellSeparator}/>}
            />
            </View>
        )
        if(this.state.page === "reply"){
            trendsContent = (
            <View style={styles.mineTrendsContent}>
            <ListView dataSource={this.state.replyDatasource} renderRow={this.renderTopicRow.bind(this)} style={{backgroundColor:"red"}}
            renderSeparator={(sectionId,rowId)=><View key={`${sectionId}-${rowId}`} style={styles.cellSeparator}/>}
            />
            </View>
            )
        }
        return (
            <View style={styles.mineTrends}>
                <Tabs selected={this.state.page} style={styles.mineTrendsTab} 
                    selectedStyle={styles.mineTrendsSelectedTab} onSelect={(el) => this.setState({ page: el.props.name }) }>
                    <Text name="topic" style={styles.mineTrendsUnselectedTab}>最近主题</Text>
                    <Text name="reply" style={styles.mineTrendsUnselectedTab}>最近回复</Text>
                </Tabs>
                {trendsContent}
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderNavigationBar() }
                {this.renderBreif() }
                {this.renderTrends() }
            </View>
        )
    }
}

export default containerByComponent(Mine, userReducer, { fetchUser, authorizeByToken })

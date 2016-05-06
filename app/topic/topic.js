'use strict'

import React,{Component,View,Text,Image,ScrollView} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import HtmlView from "react-native-htmlview"

import {containerByComponent} from "../lib/redux-helper"

import {fetchTopic} from "./action"
import {topicReducer} from "./reducer"

import styles from "./stylesheet/topic"

class Topic extends Component{
    componentDidMount(){
        this.props.fetchTopic(this.props.id)
    }
    renderNavigationBar(){
        const titleConfig = {
            title:"主题详情"
        }
        const leftButtonConfig = {
            title:"返回",
            handler:()=>Actions.pop()
        }
        return <NavigationBar title={titleConfig} leftButton={leftButtonConfig} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    renderContent(){
        const {topic} = this.props
        if(!topic){
            return null
        }
        return (
            <View style={styles.topicContent}>
            <View style={styles.topicBreif}>
            <Image source={{uri:topic.author.avatar_url}} style={styles.topicImage}/>
            <View style={styles.topicSubtitle}>
                <Text style={styles.topicSubtitleText}>{topic.author.loginname}</Text>
                <Text style={styles.topicMintitleText}>{topic.create_at}</Text>
            </View>
            <View style={styles.topicBadge}><Text style={styles.topicBadgeText}>{topic.tab}</Text></View>
            </View>
            <View style={styles.topicContent}>
            <HtmlView value={topic.content}/>
            </View>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            <ScrollView>
            {this.renderContent()}
            </ScrollView>
            </View>
        )
    }
}

export default containerByComponent(Topic,topicReducer,{fetchTopic},{...this.props})




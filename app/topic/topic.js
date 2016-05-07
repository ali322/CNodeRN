'use strict'

import React,{Component,View,Text,Image,ScrollView,TouchableOpacity} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"
import HTMLView from "../common/htmlview"

import {containerByComponent} from "../lib/redux-helper"

import {fetchTopic} from "./action"
import {topicReducer} from "./reducer"

import styles from "./stylesheet/topic"

class Topic extends Component{
    componentDidMount(){
        this.props.fetchTopic(this.props.id)
    }
    renderNavigationBar(){
        const title = (
            <View style={styles.navigationBarTitle}>
                <Text style={styles.navigationBarTitleText}>主题详情</Text>
            </View>
        )
        const rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>{
                const {topic} = this.props
                if(!topic){
                    return
                }
                Actions.reply({id:topic.id})
            }}>
                <Icon name="mail-reply" size={20} color="#999"/>
            </TouchableOpacity>
        )
        const leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={()=>Actions.pop()}>
            <Icon name="angle-left" size={25} color="#666"/>
            <Text style={styles.navigationBarButtonText}>返回</Text>
            </TouchableOpacity>
        )
        return <NavigationBar title={title} leftButton={leftButton} rightButton={rightButton} style={styles.navigationBar} tintColor="#F8F8F8"/>
    }
    renderContent(){
        const {topic} = this.props
        if(!topic){
            return null
        }
        const comments = topic.replies.map((reply,i)=>{
            return (
                <View style={styles.topicComment} key={i}>
                <View style={styles.topicCommentBreif}>
                    <Image source={{uri:reply.author.avatar_url}} style={styles.topicCommentAvatar}/>
                    <View style={styles.topicSubtitle}>
                        <Text style={styles.topicSubtitleText}>{reply.author.loginname}</Text>
                        <Text style={styles.topicMintitleText}>{reply.create_at}</Text>
                    </View>
                    <View style={styles.topicCommentBadge}>
                        <Icon name="comment" size={15} color="#AAA"/>
                    </View>
                    <View style={styles.topicCommentBadge}>
                        <Icon name="thumbs-up" size={15} color="#AAA"/>
                    </View>
                </View>
                <View style={styles.topicDesc}>
                    <HTMLView html={reply.content}/>
                </View>
                </View>            
            )
        })
        return (
            <View style={styles.topicContent}>
            <View style={styles.topicBreif}>
                <Image source={{uri:topic.author.avatar_url}} style={styles.topicImage}/>
                <View style={styles.topicSubtitle}>
                    <Text style={styles.topicSubtitleText}>{topic.author.loginname}</Text>
                    <Text style={styles.topicMintitleText}>{topic.create_at},{topic.visit_count} 次点击</Text>
                </View>
                <View style={styles.topicBadge}><Text style={styles.topicBadgeText}>{topic.tab}</Text></View>
            </View>
            <View style={styles.topicDesc}>
                <HTMLView html={topic.content}/>
            </View>
            <View style={styles.topicComments}>
                <Text style={styles.topicCommentsStatus}>{topic.reply_count} 回复 | 最后回复: {topic.last_reply_at}</Text>
                <View style={styles.topicCommentsList}>{comments}</View>
            </View>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container} removeClippedSubviews={true}>
            {this.renderNavigationBar()}
            <ScrollView>
            {this.renderContent()}
            </ScrollView>
            </View>
        )
    }
}

export default containerByComponent(Topic,topicReducer,{fetchTopic},{...this.props})




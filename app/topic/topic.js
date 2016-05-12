'use strict'

import React,{Component,View,Text,Image,ScrollView,TouchableOpacity,ListView,InteractionManager} from "react-native"
import NavigationBar from "react-native-navbar"
import {Actions} from "react-native-router-flux"
import Icon from "react-native-vector-icons/FontAwesome"
import HTMLView from "../common/htmlview"
import timer from "react-timer-mixin"

import Loading from "../common/loading"

import {containerByComponent} from "../lib/redux-helper"
import {fetchTopic} from "./action"
import {topicReducer} from "./reducer"

import styles from "./stylesheet/topic"

class Topic extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            dataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1 !== r2,
                sectionHeaderHasChanged:(s1,s2)=>s1 !== s2
            })
        } 
    }
    componentDidMount(){
        // InteractionManager.runAfterInteractions(()=>{
        setTimeout(()=>{
            this.props.fetchTopic(this.props.id)    
        },300)
        // })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.topicFetched && !nextProps.topicFetching){
            this.setState({
                loading:false,
                dataSource:this.state.dataSource.cloneWithRows(nextProps.topic.replies)
            })
        }
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
        const renderComment = (reply)=>{
            return (
                <View style={styles.topicComment}>
                <View style={styles.topicCommentBreif}>
                    <Image source={{uri:reply.author.avatar_url}} style={styles.topicImage}/>
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
                    <HTMLView html={reply.content.replace(/\s/g,"")}/>
                </View>
                </View>            
            )
        }
        
        return (
            <ListView dataSource={this.state.dataSource}  style={styles.topicContent} 
            initialListSize={10} removeClippedSubviews={true} enableEmptySections={true} 
            renderRow={renderComment} renderHeader={()=>{
                return (
                    <View>
                        <View style={styles.topicBreif}>
                            <Image source={{uri:topic.author.avatar_url}} style={styles.topicImage}/>
                            <View style={styles.topicSubtitle}>
                                <Text style={styles.topicSubtitleText}>{topic.author.loginname}</Text>
                                <Text style={styles.topicMintitleText}>{topic.create_at},{topic.visit_count} 次点击</Text>
                            </View>
                            <View style={styles.topicBadge}><Text style={styles.topicBadgeText}>{topic.tab}</Text></View>
                        </View>
                        <View style={styles.topicDesc}>
                            <HTMLView html={topic.content.replace(/\s/g,"")}/>
                        </View>
                        <View style={styles.topicComments}>
                            <Text style={styles.topicCommentsStatus}>{topic.reply_count} 回复 | 最后回复: {topic.last_reply_at}</Text>
                        </View>
                    </View>
                )
            }}/>
        )
    }
    render(){
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            {this.state.loading?<Loading />:this.renderContent()}
            </View>
        )
    }
}

export default containerByComponent(Topic,topicReducer,{fetchTopic},{...this.props})




'use strict'

import React,{Component} from "react"
import {View,Text,Image,ScrollView,TouchableOpacity,ListView,InteractionManager,Dimensions} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

import HTMLView from "../common/component/htmlview"
import WebContainer from "../common/component/webcontainer"
import Loading from "../common/component/loading"
import NavBar from "../common/component/navbar"
import Alert from "../common/component/alert"

import containerByComponent from "../lib/redux-helper"
import pureRender from "../lib/pure-render"
import {fetchTopic,toggleCollect,toggleAgree} from "./action"
import {topicReducer} from "./reducer"

import styles from "./stylesheet/topic"
import preferredThemeByName,{theme} from "../common/stylesheet/theme"

class Topic extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            dataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=>{
                    return r1 !== r2
                },
                sectionHeaderHasChanged:(s1,s2)=>s1 !== s2
            })
        }
        this._preferredTheme = preferredThemeByName(props.userPrefs["preferredTheme"])
        this._preferredThemeDefines = theme[props.userPrefs["preferredTheme"]]
    }
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
        // requestAnimationFrame(()=>{
            this.props.actions.fetchTopic(this.props.id)    
        // })
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.topicFetched && !nextProps.topicFetching){
            this.setState({
                loading:false,
                dataSource:this.state.dataSource.cloneWithRows(nextProps.topic.replies)
            })
        }
        if(!nextProps.agreeToggling && nextProps.agreeToggled){
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(nextProps.topic.replies)
            })
        }
    }
    _toggleCollect(){
        const {id,topic,navigationActions} = this.props
        if(!topic){
            return
        }
        const {user} = this.props
        if(!user){
            this._alert.alert("请先登录","登录",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigationActions.pushScene("login")}
            ])
        }else{
            this.props.actions.toggleCollect(id,user.accessToken,topic.is_collect)
        }
    }
    _toggleAgree(replyID){
        const {navigationActions,user} = this.props
        if(!user){
            this._alert.alert("请先登录","",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigationActions.pushScene("login")}
            ])
        }else{
            this.props.actions.toggleAgree(replyID,user.accessToken)
        }
    }
    _toReply(param){
        const {navigationActions,user} = this.props
        if(!user){
            this._alert.alert("请先登录","",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigationActions.pushScene("login")}
            ])
        }else{
            if(this.props.collect){
                navigationActions.pushScene("collect2reply",param)
            }else{
                navigationActions.pushScene("reply",param)
            }
        }
    }
    renderNavigationBar(){
        const {topic} = this.props
        const {popScene} = this.props.navigationActions
        const isCollect = topic && topic.is_collect
        const unselectedIcon = this._preferredThemeDefines["uncollectIcon"].color
        const selectedIcon = this._preferredThemeDefines["collectIcon"].color
        const rightButton = (
            <View style={[styles.navigationBarButton,{marginRight:5}]}>
                <TouchableOpacity onPress={this._toggleCollect.bind(this)}>
                    <Icon name={isCollect?"heart":"heart-o"} size={20} color={isCollect?selectedIcon:unselectedIcon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    if(!topic){
                        return
                    }
                    this._toReply({id:topic.id})
                }} style={{marginLeft:8}}>
                    <Icon name="mail-reply" size={20} color="#999"/>
                </TouchableOpacity>
            </View>
        )
        return <NavBar title="主题详情" rightButton={()=>rightButton} onLeftButtonClick={popScene} userPrefs={this.props.userPrefs}/>
    }
    renderContent(){
        const {topic} = this.props
        if(!topic){
            return null
        }
        const unselectedIcon = this._preferredThemeDefines["disagreeIcon"].color
        const selectedIcon = this._preferredThemeDefines["agreeIcon"].color
        const renderComment = (reply)=>{
            return (
                <View style={[styles.topicComment,this._preferredTheme["topicComment"]]}>
                <View style={styles.topicCommentBreif}>
                    <Image source={{uri:reply.author.avatar_url}} style={styles.topicImage}/>
                    <View style={styles.topicSubtitle}>
                        <Text style={[styles.topicSubtitleText,this._preferredTheme["topicSubtitleText"]]}>{reply.author.loginname}</Text>
                        <Text style={styles.topicMintitleText}>{reply.create_at}</Text>
                    </View>
                    <TouchableOpacity style={styles.topicCommentBadge} onPress={()=>{
                        this._toReply({id:this.props.topic.id,replyTo:reply})
                    }}>
                        <Icon name="mail-reply" size={15} color="#AAA"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topicCommentBadge,styles.topicAgreeBadge]} onPress={this._toggleAgree.bind(this,reply.id)}>
                        <Icon name="thumbs-up" size={15} color={reply.agreeStatus === "up"?selectedIcon:unselectedIcon}/>
                        <Text style={[styles.topicAgreeBadgeText,{color:reply.agreeStatus === "up"?selectedIcon:unselectedIcon}]}> +{reply.ups.length}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.topicDesc,this._preferredTheme["topicDesc"]]}>
                    <HTMLView value={reply.content.replace(/(\n|\r)+$/g,"")}/>
                </View>
                </View>            
            )
        }
        
        return (
            <ListView dataSource={this.state.dataSource}  style={styles.topicContent} 
            scrollRenderAheadDistance={20} 
            initialListSize={1} removeClippedSubviews={true} enableEmptySections={true} 
            renderRow={renderComment} renderHeader={()=>{
                return (
                    <View>
                        <View style={styles.topicBreif}>
                            <Image source={{uri:topic.author.avatar_url}} style={styles.topicImage}/>
                            <View style={styles.topicSubtitle}>
                                <Text style={[styles.topicSubtitleText,this._preferredTheme["topicSubtitleText"]]}>{topic.author.loginname}</Text>
                                <Text style={styles.topicMintitleText}>{topic.create_at},{topic.visit_count} 次点击</Text>
                            </View>
                            <View style={[styles.topicBadge,this._preferredTheme["topicTag"]]}>
                                <Text style={[styles.topicBadgeText,this._preferredTheme["topicTagText"]]}>{topic.tab}</Text>
                            </View>
                        </View>
                        <View style={[styles.topicDesc,this._preferredTheme["topicDesc"]]}>
                            <HTMLView value={topic.content.replace(/(\n|\r)+$/g,"")} maxImageWidth={Dimensions.get("window").width - 16}/>
                        </View>
                        <View style={[styles.topicComments,this._preferredTheme["topicComments"]]}>
                            <Text style={[styles.topicCommentsStatus,this._preferredTheme["topicSubtitleText"]]}>{topic.reply_count} 回复 | 最后回复: {topic.last_reply_at}</Text>
                        </View>
                    </View>
                )
            }}/>
        )
    }
    render(){
        return (
            <View style={[styles.container,this._preferredTheme["container"]]}>
            {this.renderNavigationBar()}
            {this.state.loading?<Loading color={this._preferredThemeDefines["loading"].color}/>:this.renderContent()}
            <Alert ref={(view)=>this._alert=view}/>
            </View>
        )
    }
}

export default containerByComponent(Topic,topicReducer,{fetchTopic,toggleAgree,toggleCollect})




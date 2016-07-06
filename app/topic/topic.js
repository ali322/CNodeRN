'use strict'

import React,{Component} from "react"
import {View,Text,Image,ScrollView,TouchableOpacity,ListView,InteractionManager,Dimensions} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

import HTMLView from "../common/component/htmlview"
import HTMLRender from "../common/component/htmlrender"
import Loading from "../common/component/loading"
import NavBar from "../common/component/navbar"
import Alert from "../common/component/alert"
import TopicContent from "./partial/topic-content"

import containerByComponent from "../lib/redux-helper"
import pureRender from "../lib/pure-render"
import {fetchTopic,toggleCollect,toggleAgree} from "./action"
import {topicReducer} from "./reducer"

import defaultStyles from "./stylesheet/topic"
import preferredThemer from "../common/theme"

@preferredThemer(defaultStyles)
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
        const {authentication} = this.props
        if(!authentication){
            this._alert.alert("请先登录","登录",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigationActions.pushScene("login")}
            ])
        }else{
            this.props.actions.toggleCollect(id,authentication.accessToken,topic.is_collect)
        }
    }
    _toggleAgree(replyID){
        const {navigationActions,authentication} = this.props
        if(!authentication){
            this._alert.alert("请先登录","",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigationActions.pushScene("login")}
            ])
        }else{
            this.props.actions.toggleAgree(replyID,authentication.accessToken)
        }
    }
    _toReply(param){
        const {navigationActions,authentication} = this.props
        if(!authentication){
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
        const {topic,styles,styleConstants} = this.props
        const {popScene} = this.props.navigationActions
        const isCollect = topic && topic.is_collect
        const unselectedIcon = styleConstants.uncollectIconColor
        const selectedIcon = styleConstants.uncollectIconColor
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
        const {topic,userPrefs,styles,styleConstants,htmlStyles} = this.props
        if(!topic){
            return null
        }
        const unselectedIcon = styleConstants.disagreeIconColor
        const selectedIcon = styleConstants.agreeIconColor
        const renderComment = (reply)=>{
            let avatarURL = reply.author.avatar_url
            if (/^\/\/.*/.test(avatarURL)) {
                avatarURL = 'http:' + avatarURL
            }
            return (
                <View style={[styles.topicComment]}>
                <View style={styles.topicCommentBreif}>
                    <Image source={{uri:avatarURL}} style={styles.topicImage}/>
                    <View style={styles.topicSubtitle}>
                        <Text style={[styles.topicSubtitleText]}>{reply.author.loginname}</Text>
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
                <View style={[styles.topicDesc]}>
                    <HTMLRender value={reply.content.replace(/(\n|\r)+$/g,"")} style={htmlStyles}/>
                </View>
                </View>            
            )
        }
        return (
            <ListView dataSource={this.state.dataSource}  style={styles.topicContent} 
            scrollRenderAheadDistance={20} 
            initialListSize={1} removeClippedSubviews={true} enableEmptySections={true} 
            renderRow={renderComment} renderHeader={()=><TopicContent topic={topic} styles={styles} htmlStyle={htmlStyles}/>}/>
        )
    }
    render(){
        const {styles,styleConstants} = this.props
        return (
            <View style={[styles.container]}>
            {this.renderNavigationBar()}
            {this.state.loading?<Loading color={styleConstants.loadingColor}/>:this.renderContent()}
            <Alert ref={(view)=>this._alert=view}/>
            </View>
        )
    }
}

export default containerByComponent(Topic,topicReducer,{fetchTopic,toggleAgree,toggleCollect})
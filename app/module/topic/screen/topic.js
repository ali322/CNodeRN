import React from 'react'
import { View, Text, ListView, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import container from 'redux-container'
import { topicReducer } from '../reducer'
import { fetchTopic,toggleAgree,toggleCollect } from '../action'
import { mapProps } from '../../../lib/hoc'
import preferredThemer from '../../../theme/'
import defaultStyles from '../stylesheet/topic'
import { HTMLRender, Loading, Alert,Header } from '../../../component/'

@mapProps('screenProps')
@preferredThemer(defaultStyles)
@container(topicReducer, {}, { fetchTopic,toggleAgree,toggleCollect })
class Topic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            replyDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }
        this.renderHeaderButtons = this.renderHeaderButtons.bind(this)
        this.renderReply = this.renderReply.bind(this)
        this.renderContent = this.renderContent.bind(this)
        this.toggleCollect = this.toggleCollect.bind(this)
        this.toggleAgree = this.toggleAgree.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.topicFetched || nextProps.agreeToggled) {
            this.setState({
                replyDataSource: this.state.replyDataSource.cloneWithRows(nextProps.topic.replies)
            })
        }
    }
    componentDidMount() {
        const { state } = this.props.navigation
        const { fetchTopic } = this.props.actions
        fetchTopic(state.params.id)
    }
    toggleCollect() {
        const {auth,topic} = this.props
        const {navigate,state} = this.props.navigation
        const {toggleCollect} = this.props.actions
        if(!auth){
            this._alert.alert("请先登录","登录",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigate("login")}
            ])
        }else{
            toggleCollect({
                topicId:state.params.id,
                accessToken:authentication.accessToken,
                isCollected:topic.is_collect
            })
        }
    }
    toggleAgree(id) {
        const {auth} = this.props
        const {navigate} = this.props.navigation
        const {toggleAgree} = this.props.actions
        if(!auth){
            this._alert.alert("请先登录","登录",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigate("login")}
            ])
        }else{
            toggleAgree({
                replyID:id,
                accessToken:authentication.accessToken
            })
        }
    }
    renderReply(reply) {
        const { styles, styleConstants, topic ,htmlStyles} = this.props
        let avatarURL = reply.author.avatar_url
        if (/^\/\/.*/.test(avatarURL)) {
            avatarURL = 'http:' + avatarURL
        }
        const unselectedIcon = styleConstants.disagreeIconColor
        const selectedIcon = styleConstants.agreeIconColor
        return (
            <View style={[styles.topicComment]}>
                <View style={styles.topicCommentBreif}>
                    <Image source={{uri:avatarURL}} style={styles.topicImage}/>
                    <View style={styles.topicSubtitle}>
                        <Text style={[styles.topicSubtitleText]}>{reply.author.loginname}</Text>
                        <Text style={styles.topicMintitleText}>{reply.create_at}</Text>
                    </View>
                    <TouchableOpacity style={styles.topicCommentBadge} onPress={()=>{
                        this._toReply({id:topic.id,replyTo:reply})
                    }}>
                        <Icon name="mail-reply" size={15} color="#AAA"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topicCommentBadge,styles.topicAgreeBadge]} 
                    onPress={()=>toggleAgree(reply.id)}>
                        <Icon name="thumbs-up" size={15} color={reply.agreeStatus === "up"?selectedIcon:unselectedIcon}/>
                        <Text style={[styles.topicAgreeBadgeText,{color:reply.agreeStatus === "up"?selectedIcon:unselectedIcon}]}> +{reply.ups.length}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.topicDesc]}>
                    <Text>{reply.content.replace(/(\n|\r)+$/g,"")}</Text>
                </View>
            </View>
        )
    }
    renderContent() {
        const { styles, topic, userPrefs, htmlStyles } = this.props
        let avatarURL = topic.author.avatar_url
        if (/^\/\/.*/.test(avatarURL)) {
            avatarURL = 'http:' + avatarURL
        }
        return (
            <View>
                <View style={styles.topicBreif}>
                    <Image source={{uri:avatarURL}} style={styles.topicImage}/>
                    <View style={styles.topicSubtitle}>
                        <Text style={[styles.topicSubtitleText]}>{topic.author.loginname}</Text>
                        <Text style={styles.topicMintitleText}>{topic.create_at},{topic.visit_count} 次点击</Text>
                    </View>
                    <View style={[styles.topicBadge]}>
                        <Text style={[styles.topicBadgeText]}>{topic.tab}</Text>
                    </View>
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <View style={styles.topicDesc}>
                    <Text>{topic.content.replace(/(\n|\r)+$/g,"")}</Text>
                </View>
                <View style={[styles.topicComments]}>
                    <Text style={[styles.topicCommentsStatus]}>{topic.reply_count} 回复 | 最后回复: {topic.last_reply_at}</Text>
                </View>
            </View>
        )
    }
    toReply(id,replyTo){
        const {auth} = this.props
        const {navigate} = this.props.navigation
        if(!auth){
            this._alert.alert("请先登录","登录",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navigate("login")}
            ])
        }else{
            navigate('reply',{id,replyTo})
        }
    }
    renderHeaderButtons(){
        const {styles,styleConstants,topic} = this.props
        const unselectedIcon = styleConstants.uncollectIconColor
        const selectedIcon = styleConstants.uncollectIconColor
        return (
            <View style={[styles.navigationBarButton,{marginRight:5}]}>
                <TouchableOpacity onPress={this.toggleCollect}>
                    <Icon name={topic.is_collect?"heart":"heart-o"} size={20} color={topic.is_collect?selectedIcon:unselectedIcon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.toReply(topic.id)} style={{marginLeft:8}}>
                    <Icon name="mail-reply" size={20} color="#999"/>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { styles, topic, styleConstants,userPrefs } = this.props
        const {goBack} = this.props.navigation
        if (!topic) {
            return <Loading color={styleConstants.loadingColor}/>
        }
        return (
            <View style={styles.container}>
                <Header title="详情" userPrefs={userPrefs} onLeftButtonClick={()=>goBack(null)} rightButton={this.renderHeaderButtons()}/>
                <ListView dataSource={this.state.replyDataSource} renderRow={this.renderReply}
                renderHeader={this.renderContent}/>
                <Alert ref={view=>this._alert=view} />
            </View>
        )
    }
}

export default Topic
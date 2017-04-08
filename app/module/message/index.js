import React, { PropTypes } from 'react'
import { View, Text, ListView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import preferredThemer from '../../theme/'
import { connected } from 'redux-container'
import * as actions from './action'
import defaultStyles from './stylesheet'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { HtmlView, Tabs, Loading } from '../../component/'
import { loginRequired, mapProps } from '../common/hoc'

@connected(state => ({ ...state.messageReducer, ...state.authReducer,...state.userPrefsReducer }), actions)
@preferredThemer(defaultStyles)
class Mine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            unreadDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            readDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            isLogined: false
        }
        this.renderRow = this.renderRow.bind(this)
        this.renderTimeline = this.renderTimeline.bind(this)
    }
    componentDidMount() {
        const { fetchMessages } = this.props.actions
        const { auth } = this.props
        if (auth.isLogined) {
            fetchMessages(auth.accessToken)
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.messagesFetched) {
            this.setState({
                unreadDataSource: this.state.unreadDataSource.cloneWithRows(nextProps.messages.hasnot_read_messages),
                readDataSource: this.state.readDataSource.cloneWithRows(nextProps.messages.has_read_messages)
            })
        }
    }
    renderRow(message) {
        const { styles, htmlStyles } = this.props
        const {navigate} = this.props.navigation
        return (
            <View style={styles.topicCell}>
                <View style={styles.cellRow}>
                    <Image source={{uri:message.author.avatar_url}} style={styles.cellImage}/>
                    <View style={styles.cellSubtitle}>
                        <Text style={styles.cellSubtitleText}>{message.author.loginname}</Text>
                        <Text style={styles.cellMintitleText}>{message.reply.create_at}</Text>
                    </View>
                    <TouchableOpacity style={styles.cellAccessory} onPress={()=>navigate('reply',{id:message.topic.id,replyTo:{...message.reply,author:message.author}})}>
                    <Text style={styles.cellAccessoryText}>回复</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cellTitle}>
                    <Text style={styles.cellSubtitleText}>评论了<Text style={styles.repliedTopicTitle}>{message.topic.title}</Text></Text>
                </View>
                <View style={[styles.cellTitle]}>
                    <HtmlView value={message.reply.content.replace(/(\n|\r)+$/g,"")} style={htmlStyles}/>
                </View>
            </View>
        )
    }
    renderTimeline() {
        const { styles } = this.props
        const renderTabBar = () => (
            <Tabs style={styles.tab} 
                selectedStyle={styles.selectedTab}>
                    <Text style={styles.unselectedTab}>未读</Text>
                    <Text style={styles.unselectedTab}>已读</Text>
                </Tabs>
        )
        return (
            <ScrollableTabView renderTabBar={renderTabBar}>
                <ListView enableEmptySections={true} dataSource={this.state.unreadDataSource} renderRow={this.renderRow}/>
                <ListView enableEmptySections={true} dataSource={this.state.readDataSource} renderRow={this.renderRow}/>
            </ScrollableTabView>
        )
    }
    render() {
        const { styles, styleConstants, messagesFetched } = this.props
        return (
            <View style={styles.container}>
                {!messagesFetched?<Loading color={styleConstants.loadingColor}/>:this.renderTimeline()}
            </View>
        )
    }
}

export default Mine
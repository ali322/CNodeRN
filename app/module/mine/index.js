import React, { PropTypes } from 'react'
import { View, Text, ListView, TouchableOpacity, Image, Animated } from 'react-native'
import preferredThemer from '../../theme/'
import { connected } from 'redux-container'
import Icon from 'react-native-vector-icons/FontAwesome'
import { userReducer, cacheReducer } from './reducer'
import * as actions from './action'
import defaultStyles from './stylesheet/mine'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { HtmlRender, Tabs, Loading } from '../../component/'
import { formatTime } from '../../lib/'
import { loginRequired } from '../common/hoc'

@loginRequired()
@connected(state => ({
    ...state.userReducer,
    ...state.authReducer,
    ...state.userPrefsReducer
}), actions)
@preferredThemer(defaultStyles)
class Mine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topicDatasource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            replyDatasource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            isLogined: false
        }
        this.renderRow = this.renderRow.bind(this)
        this.renderTrends = this.renderTrends.bind(this)
        this.renderBreif = this.renderBreif.bind(this)
    }
    componentDidMount() {
        const { auth } = this.props
        const { fetchUser } = this.props.actions
        if (auth.isLogined) {
            fetchUser(auth.username)
        }
    }
    renderBreif() {
        const { user, styles } = this.props
        const { navigate } = this.props.navigation
        if (!user) return null
        return (
            <View style={styles.mineBreif}>
                <TouchableOpacity style={styles.setup} onPress={()=>navigate('setup')}>
                    <Icon name='cog' size={22} color="#999" />
                </TouchableOpacity>
                <View style={styles.mineAuthorize}>
                    <Image source={{ uri: user.avatar_url }} style={styles.mineAvatar}/>
                    <Text style={styles.mineAuthorizeText}>{user.loginname}</Text>
                    <Text style={[styles.mineAuthorizeText, styles.mineAuthorizeSubtext]}>注册时间: <Text>{formatTime(user.create_at) }</Text></Text>
                </View>
            </View>
        )
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                topicDatasource: this.state.topicDatasource.cloneWithRows(nextProps.user.recent_topics),
                replyDatasource: this.state.topicDatasource.cloneWithRows(nextProps.user.recent_replies)
            })
        }
    }
    renderRow(topic) {
        const { user, styles } = this.props
        return (
            <TouchableOpacity>
                <Animated.View style={styles.topicCell}>
                    <View style={styles.topicBreif}>
                        <Image source={{ uri: user.avatar_url }} style={styles.topicImage}/>
                        <View style={[styles.topicSubtitle]}>
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
        const { styles } = this.props
        const renderTabs = () => {
            return (
                <Tabs style={styles.tab} 
                selectedStyle={styles.selectedTab}>
                    <Text style={styles.mineTrendsUnselectedTab} name="topic">最近主题</Text>
                    <Text style={styles.mineTrendsUnselectedTab} name="reply">最近回复</Text>
                </Tabs>
            )
        }
        return (
            <View style={styles.mineTrends}>
                <ScrollableTabView renderTabBar={renderTabs}>
                    <View style={styles.mineTrendsContent}>
                        <ListView dataSource={this.state.topicDatasource} renderRow={this.renderRow} enableEmptySections={true} 
                            renderSeparator={(sectionId, rowId) => <View key={`${sectionId}-${rowId}`} style={styles.cellSeparator}/>}
                            />
                    </View>
                    <View style={styles.mineTrendsContent}>
                        <ListView dataSource={this.state.replyDatasource} renderRow={this.renderRow} enableEmptySections={true} 
                            renderSeparator={(sectionId, rowId) => <View key={`${sectionId}-${rowId}`} style={styles.cellSeparator}/>}
                            />
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
    render() {
        const { styles, userFetching, styleConstants } = this.props
        if (userFetching) {
            return <View style={styles.container}><Loading color={styleConstants.loadingColor}/></View>
        }
        return (
            <View style={styles.container}>
                {this.renderBreif()}
                {this.renderTrends()}
            </View>
        )
    }
}

export default Mine
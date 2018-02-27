import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ListView, TouchableOpacity, Animated, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connected } from 'redux-container'
import * as actions from './action'
import defaultStyles from './stylesheet'
import preferredThemer from '../../theme/'
import { Header, Loading } from '../../component/'
import { loginRequired } from '../common/hoc'

@connected(state => ({ ...state.collectReducer, ...state.authReducer, ...state.userPrefsReducer }), actions)
@preferredThemer(defaultStyles)
class Collect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }
        this.renderRow = this.renderRow.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.collectFetched) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.collects)
            })
        }
    }
    componentDidMount() {
        const { fetchCollect } = this.props.actions
    }
    renderRow(topic) {
        const { styles } = this.props
        const {navigate} = this.props.navigation
        return (
            <TouchableOpacity onPress={()=>navigate("topic",{id:topic.id})}>
                <Animated.View style={[styles.topicCell,{
                    // opacity: this.state.rowScale,
                    // transform: [{ scaleX: this.state.rowScale }]
                }]}>
                        <View style={styles.topicBreif}>
                            <Image source={{uri:topic.author.avatar_url}} style={styles.topicImage}/>
                            <View style={styles.topicSubtitle}>
                                <Text style={styles.topicSubtitleText}>{topic.author.loginname}</Text>
                                <View style={styles.topicMintitle}>
                                    <Text style={[styles.topicMintitleText]}>{topic.create_at}</Text>
                                    <View style={styles.topicTag}>
                                        <Text style={styles.topicTagText}>{topic.tab}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.topicAccessory}>
                                <Text style={styles.topicStatic}><Text style={styles.topicReply}>{topic.reply_count}</Text> /{topic.visit_count}</Text>
                            </View>
                        </View>
                        <View style={styles.topicTitle}>
                            <Text style={styles.topicTitleText} numberOfLines={2}>{topic.title}</Text>
                        </View>
                </Animated.View>
                </TouchableOpacity>
        )
    }
    render() {
        const { styles, collectFetched, styleConstants, userPrefs } = this.props
        const renderSeparator = (sectionId, rowId) => <View key={`${sectionId}-${rowId}`} style={styles["cellSeparator"]}/>
        return (
            <View style={styles.container}>
                <Header title="收藏" leftButton={null} userPrefs={userPrefs}/>
                {!collectFetched?<Loading color={styleConstants.loadingColor}/>:(
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} renderSeparator={renderSeparator}/>
                )}
            </View>
        )
    }
}

export default Collect
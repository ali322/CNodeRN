import React from 'react'
import { View, Text, ListView, TouchableOpacity, Animated, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { mapProps } from '../../lib/hoc'
import preferredThemer from '../../theme/'
import container from 'redux-container'
import { collectReducer } from './reducer'
import * as actions from './action'
import defaultStyles from './stylesheet'
import { Header } from '../../component/'

@mapProps('screenProps')
@preferredThemer(defaultStyles)
@container(collectReducer, {}, actions)
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
    componentDidMount(){
        const {fetchCollect} = this.props.actions
        fetchCollect('ali322')
    }
    renderRow(topic) {
        const { styles } = this.props
        return (
            <TouchableOpacity>
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
        return (
            <View>
                <Header title="收藏" leftButton={null} userPrefs={this.props.userPrefs}/>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow}/>
            </View>
        )
    }
}

export default Collect
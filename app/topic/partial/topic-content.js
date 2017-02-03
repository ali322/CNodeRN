'use strict'

import React,{Component} from "react"
import {View,Text,Image,StyleSheet} from "react-native"
import HTMLRender from "../../common/component/htmlrender"
import {HtmlView} from "nva-ui"

class TopicContent extends Component{
    render(){
        const {styles,topic,userPrefs,htmlStyle} = this.props
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
                <View style={styles.topicDesc}>
                    <HtmlView content={topic.content.replace(/(\n|\r)+$/g,"")} style={htmlStyle}/>
                </View>
                <View style={[styles.topicComments]}>
                    <Text style={[styles.topicCommentsStatus]}>{topic.reply_count} 回复 | 最后回复: {topic.last_reply_at}</Text>
                </View>
            </View>
        )
    }
}

export default TopicContent
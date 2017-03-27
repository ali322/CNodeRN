import React from 'react'
import { View, Text,TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import container from 'redux-container'
import { mapProps } from '../../../lib/hoc'
import {topicReducer} from '../reducer'
import {saveReply} from '../action'
import { Header, Picker, Alert } from '../../../component/'
import preferredThemer from '../../../theme/'
import defaultStyles from '../stylesheet/topic'

@mapProps('screenProps')
@preferredThemer(defaultStyles)
@container(topicReducer,{},{saveReply})
class Reply extends React.Component {
    constructor(props) {
        super(props)
        this.handleSave = this.handleSave.bind(this)
    }
    handleSave() {
        const { auth, replyTo, id } = this.props
        const { saveReply } = this.props.actions
        const reply = {
            content: this.state.content,
            reply_id: replyTo ? replyTo.id : "",
            accesstoken: auth.accessToken
        }
        saveReply({ id, reply })
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.replySaving && this.props.replySaving) {
            if (nextProps.replySaved) {
                const { goBack } = this.props.navigation
                this._alert.alert("回复成功", "", [
                    { text: "确定", onPress: () => goBack(null) }
                ])
            } else {
                this._alert.alert("回复失败", "", [
                    { text: "确定", style: "cancel" }
                ])
            }
        }
    }
    render() {
        const { styles, userPrefs,replyTo,styleConstants } = this.props
        const { goBack } = this.props.navigation
        return (
            <View style={styles.container}>
                <Header title="发表回复" rightButton="确定" onRightButtonClick={this.handleSave} onLeftButtonClick={()=>goBack(null)} userPrefs={userPrefs}/>
                <View style={styles.replyWrap}>
                <TextInput placeholder="回复内容不超过50字" onChangeText={(content)=>this.setState({content})} 
                placeholderTextColor={styleConstants.publishLabelColor} 
                defaultValue={replyTo?`@${this.props.replyTo.author.loginname} `:""} numberOfLines={10} 
                multiline={true} maxLength={200} 
                style={styles.replyInput}/>
                <Alert ref={view=>this._alert=view}/>
            </View>
            </View>
        )
    }
}

export default Reply
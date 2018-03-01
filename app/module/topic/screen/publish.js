import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connected } from 'redux-container'
import { loginRequired } from '../../common/hoc'
import { saveTopic } from '../action'
import preferredThemer from '../../../theme/'
import defaultStyles from '../stylesheet/publish'
import { Header, Picker, Alert } from '../../../component/'

const topicTabs = {
  ask: '问答',
  share: '分享',
  job: '招聘'
}

@connected(
  state => ({
    ...state.topicReducer,
    ...state.userPrefsReducer,
    ...state.authReducer
  }),
  { saveTopic }
)
@preferredThemer(defaultStyles)
class Publish extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: props.topic,
      pickerActive: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.togglePicker = this.togglePicker.bind(this)
  }
  changeField(name, value) {
    this.setState({
      topic: {
        ...this.state.topic,
        [name]: value
      }
    })
  }
  togglePicker() {
    this.setState({ pickerActive: !this.state.pickerActive })
  }
  handleSave() {
    const { auth } = this.props
    this.props.actions.saveTopic({
      ...this.state.topic,
      accesstoken: auth.accessToken
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.topicSaving && this.props.topicSaving) {
      if (nextProps.topicSaved) {
        const { goBack } = this.props.navigation
        this._alert.alert('发布成功', '', [
          { text: '确定', onPress: () => goBack(null) }
        ])
      } else {
        this._alert.alert('发布失败', '', [{ text: '确定', style: 'cancel' }])
      }
    }
  }
  renderModal() {
    const { styles } = this.props
    const { topic } = this.state
    return (
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={topic.tab}
          visible={this.state.pickerActive}
          onValueChange={value => {
            this.changeField('tab', value)
            this.togglePicker()
          }}
        >
          {Object.keys(topicTabs).map((tab, i) => {
            return <Picker.Item label={topicTabs[tab]} value={tab} key={i} />
          })}
        </Picker>
      </View>
    )
  }
  renderForm() {
    const { styles, styleConstants } = this.props
    const { topic } = this.state
    return (
      <View style={styles.publishForm}>
        <View style={styles.publishRow}>
          <Text style={styles.publishLabel}>标题</Text>
          <View style={styles.publishInput}>
            <TextInput
              placeholder="请输入标题"
              placeholderTextColor={styleConstants.publishLabelColor}
              style={styles.publishTextInput}
              onChangeText={value => this.changeField('title', value)}
            />
          </View>
        </View>
        <View style={[styles.publishRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.publishLabel}>分类</Text>
          <TouchableOpacity
            style={[styles.publishInput, styles.publishPickerInput]}
            onPress={this.togglePicker}
          >
            <Text style={styles.publishPickerValue}>
              {topicTabs[topic.tab]}
            </Text>
            <Icon name="angle-right" size={25} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.publishFormSeparator} />
        <View style={styles.publishArea}>
          <TextInput
            placeholder="请输入主题内容"
            style={styles.publishTextArea}
            placeholderTextColor={styleConstants.publishLabelColor}
            onChangeText={value => this.changeField('content', value)}
            multiline={true}
            maxLength={200}
          />
        </View>
      </View>
    )
  }
  render() {
    const { styles, userPrefs } = this.props
    const { goBack } = this.props.navigation
    return (
      <View style={styles.container}>
        <Header
          title="发布主题"
          onLeftButtonClick={() => goBack(null)}
          rightButton="确定"
          onRightButtonClick={this.handleSave}
          userPrefs={userPrefs}
        />
        {this.renderForm()}
        {this.renderModal()}
        <Alert ref={view => (this._alert = view)} />
      </View>
    )
  }
}

export default Publish

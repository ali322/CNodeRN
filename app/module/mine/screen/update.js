import React from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import CodePush from "react-native-code-push"
import * as Progress from 'react-native-progress'
import { Header,Toast } from '../../../component/'
import defaultStyles from '../stylesheet/update'
import preferredThemer from '../../../theme/'
import { mapProps } from '../../../lib/hoc'

@mapProps('screenProps')
@preferredThemer(defaultStyles)
class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            syncMessage: ''
        }
    }
    componentDidMount() {
        CodePush.notifyApplicationReady()
    }
    async _updateFromCodePush() {
        const self = this
        try {
            return await CodePush.sync({
                installMode: CodePush.InstallMode.IMMEDIATE
            }, syncStatus => {
                switch (syncStatus) {
                    case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                        self.setState({
                            syncMessage: "检查更新中..."
                        })
                        break
                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                        self.setState({
                            syncMessage: "更新包下载中..."
                        })
                        break
                    case CodePush.SyncStatus.AWAITING_USER_ACTION:
                        self.setState({
                            syncMessage: "等待中..."
                        })
                        break
                    case CodePush.SyncStatus.INSTALLING_UPDATE:
                        self.setState({
                            syncMessage: "安装更新包..."
                        })
                        break
                    case CodePush.SyncStatus.UP_TO_DATE:
                        self.setState({
                            syncMessage: "已是最新版本",
                            progress: false
                        })
                        break
                    case CodePush.SyncStatus.UPDATE_IGNORED:
                        self.setState({
                            syncMessage: "更新已暂停",
                            progress: false
                        })
                        break
                    case CodePush.SyncStatus.UPDATE_INSTALLED:
                        self.setState({
                            syncMessage: "更新安装成功,下次重启更新生效",
                            progress: false
                        })
                        break
                    case CodePush.SyncStatus.UNKNOWN_ERROR:
                        self.setState({
                            syncMessage: "未知的错误",
                            progress: false
                        })
                        break
                }
            }, progress => {
                this.setState({ progress })
            })
        } catch (e) {
            CodePush.log(e)
            this._toast.show("更新服务器异常")
        }
    }
    renderProgress() {
        const { progress } = this.state
        if (!progress) {
            return null
        }
        const scale = progress.receivedBytes / progress.totalBytes
        return <Progress.Bar progress={scale} width={200} color="#666" borderColor="#666"/>
    }
    render() {
        const {styles,userPrefs} = this.props
        const {goBack} = this.props.navigation
        return (
            <View style={styles.container}>
                <Header title="更新" onLeftButtonClick={()=>goBack(null)} userPrefs={userPrefs}/>
                <View style={styles.updaterContainer}>
                <View style={styles.updaterBreif}>{this.state.progress?this.renderProgress():<Text style={styles.updaterBreifText}>{this.state.syncMessage}</Text>}</View>
                <View style={styles.updaterButtons}>
                    <TouchableOpacity style={styles.updaterButton} onPress={this._updateFromCodePush.bind(this)}>
                        <Text style={styles.updaterButtonText}>检查更新</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <Toast ref={view=>this._toast=view}/>
            </View>
        )
    }
}
export default Update
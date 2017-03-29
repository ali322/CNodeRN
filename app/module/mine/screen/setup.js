import React, { PropTypes } from 'react'
import { View, TouchableOpacity, Text, Switch, TouchableHighlight } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import { combineReducers } from 'redux'
import defaultStyles from '../stylesheet/setup'
import preferredThemer from '../../../theme/'
import { connected } from 'redux-container'
import * as reducers from '../reducer'
import * as actions from '../action'
import { saveAuth } from '../../auth/action'
import { saveUserPrefs } from '../../common/action'
import { Header, Alert, Toast } from '../../../component/'
import { mapProps,nav } from '../../common/hoc'

const rootReducer = combineReducers(reducers)

@nav()
@mapProps('screenProps')
@preferredThemer(defaultStyles)
@connected({ ...actions, saveUserPrefs,saveAuth }, state => ({
    ...state.userReducer,
    ...state.cacheReducer
}))
class Setup extends React.Component {
    static contextTypes = {
        userPrefs: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleChangeTheme = this.handleChangeTheme.bind(this)
        const { preferredTheme } = props.userPrefs
        this.state = {
            nightMode: preferredTheme === 'dark'
        }
    }
    handleLogout() {
        const { goBack } = this.props.navigation
        const { saveAuth } = this.props.actions
        this._alert.alert('确定退出', '', [
            { text: "取消", style: "cancel" },
            {
                text: "确定",
                onPress: () => {
                    saveAuth({isLogined:false})
                    goBack(null)
                }
            }
        ])
    }
    handleChangeTheme(nightMode) {
        const {goBack} = this.props.navigation
        const { saveUserPrefs } = this.props.actions
        let userPrefs = { ...this.context.userPrefs, preferredTheme: nightMode ? 'dark' : 'default' }
        this.setState({
            nightMode: !this.state.nightMode
        },()=>{
            saveUserPrefs(userPrefs)
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cacheErased) {
            this._toast.show('缓存清除成功')
        }
    }
    _preferredFontSize() {
        const { userPrefs } = this.context
        let _fontSize = "小"
        switch (userPrefs["preferredFontSize"]) {
            case 14:
                _fontSize = "小"
                break
            case 16:
                _fontSize = "中"
                break
            case 18:
                _fontSize = "大"
                break
        }
        return _fontSize
    }
    render() {
        const { styles, actions } = this.props
        const { userPrefs } = this.context
        const { goBack, navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <Header title="设置" onLeftButtonClick={()=>goBack(null)}/>
                <View style={styles.setupPanel}>
                <TouchableOpacity style={[styles.setupRow]} onPress={actions.eraseCache}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>清除缓存</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Text style={[styles.setupRowLabelText]}><Icon name="angle-right" size={22} color="#666"/></Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.setupRow]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>夜间模式</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Switch style={{marginBottom:1}} onValueChange={this.handleChangeTheme} 
                        value={this.state.nightMode}/>
                    </View>
                </View>
                <TouchableOpacity style={[styles.setupRow]} onPress={()=>navigate("font")}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>字体大小</Text>
                    </View>
                    <View style={[styles.setupAccessory]}>
                        <View style={styles.setupComplexAccessory}><Text style={[styles.setupAccessoryText]}>{this._preferredFontSize()}</Text></View>
                        <Icon name="angle-right" size={22} color="#666"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.setupRow} onPress={()=>navigate("update")}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>检查更新</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Text style={[styles.setupRowLabelText]}><Icon name="angle-right" size={22} color="#666"/></Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.setupPanel}>
                <TouchableHighlight style={[styles.setupRow,styles.setupSingleRow]} onPress={this.handleLogout}>
                    <Text style={[styles.setupRowLabelText,{color:"#FF3300"}]}>切换用户</Text>
                </TouchableHighlight>
            </View>
            <Alert ref={view=>this._alert=view}/>
            <Toast ref={view=>this._toast=view}/>
            </View>
        )
    }
}

export default Setup
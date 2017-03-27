import React from 'react'
import { View,TouchableOpacity,Text,Switch,TouchableHighlight } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import { combineReducers } from 'redux'
import defaultStyles from '../stylesheet/setup'
import preferredThemer from '../../../theme/'
import { mapProps } from '../../../lib/hoc'
import container from 'redux-container'
import * as reducers from '../reducer'
import * as actions from '../action'
import { saveAuth } from '../../auth/action'
import { saveUserPrefs } from '../../common/action'
import { Header, Alert, Toast } from '../../../component/'

const rootReducer = combineReducers(reducers)

@mapProps('screenProps')
@preferredThemer(defaultStyles)
@container(rootReducer, {}, { ...actions, saveAuth, saveUserPrefs }, state => ({
    ...state.userReducer,
    ...state.cacheReducer
}))
class Setup extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleChangeTheme = this.handleChangeTheme.bind(this)
    }
    handleLogout() {
        const { goBack } = this.props.navigation
        const { saveAuth } = this.props.actions
        this._alert.alert('确定退出', '', [
            { text: "取消", style: "cancel" },
            {
                text: "确定",
                onPress: () => {
                    saveAuth(null)
                    goBack()
                }
            }
        ])
    }
    handleChangeTheme(nightMode) {
        const {saveUserPrefs} = this.props.actions
        let userPrefs = { ...this.props.userPrefs, preferredTheme: nightMode ? 'dark' : 'default' }
        saveUserPrefs(userPrefs)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cacheErased) {
            this._toast.show('缓存清除成功')
        }
    }
    _preferredFontSize() {
        const { userPrefs } = this.props
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
        const { styles, userPrefs, actions } = this.props
        const { goBack, navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <Header title="设置" onLeftButtonClick={()=>goBack(null)} userPrefs={userPrefs}/>
                <View style={styles.setupPanel}>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={actions.eraseCache}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>清除缓存</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Text style={[styles.setupRowLabelText]}><Icon name="angle-right" size={22} color="#666"/></Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.setupRow,{borderBottomWidth:0.5}]}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>夜间模式</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                        <Switch style={{marginBottom:1}} onValueChange={this.handleChangeTheme} 
                        value={userPrefs && userPrefs["preferredTheme"] === "dark"}/>
                    </View>
                </View>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={()=>navigate("font")}>
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
                <TouchableHighlight style={styles.setupRow} onPress={this.handleLogout}>
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
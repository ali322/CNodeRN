import React,{Component} from "react"
import {View,Text,TouchableOpacity,StatusBar,StyleSheet,Platform,Dimensions} from "react-native"
import preferredThemer from "../theme"

const stylesForAll = {
    header:{
        height:Platform.OS === "ios"?60:40,
        borderBottomColor: "#DDD",
        borderBottomWidth: 0.5,
        backgroundColor:"#FFF"
    },
    navigationBar:{
        marginTop:Platform.OS === "ios"?20:0,
        flexDirection:"row",
        alignItems:"center",
        flex:1
    },
    navigationBarButton:{
        marginRight:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:50
    },
    navigationBarButtonText:{
        fontSize:16,
        color:"#666"
        // paddingLeft:3 
    },
    navigationBarTitle:{
        // height:20,
        // marginVertical:Platform.OS === "ios"?8:6,
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    navigationBarTitleText:{
        fontSize:16
    }
}

const defaultStyles = StyleSheet.create(stylesForAll)

@preferredThemer(defaultStyles)
class Header extends Component{
    static defaultProps = {
        userPrefs:{},
        leftButton:"返回"
    }
    constructor(props){
        super(props)
        this.renderHeader = this.renderHeader.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
            if(Platform.OS === "ios"){
                StatusBar.setBarStyle((nextProps.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
            }
        }
    }
    componentDidMount(){
        if(Platform.OS === "ios"){
            StatusBar.setBarStyle((this.props.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
        }
    }
    renderHeader(){
        const {title,leftButton,rightButton,onLeftButtonClick,onRightButtonClick,styles} = this.props
        let _title = (
            <View style={styles.navigationBarTitle}>
            {React.isValidElement(title)?title:<Text style={styles.navigationBarTitleText}>{title}</Text>}
            </View>
        )
        
        let _leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={onLeftButtonClick || (()=>{})}>
            {React.isValidElement(leftButton)?leftButton:<Text style={styles.navigationBarButtonText}>{leftButton}</Text>}
            </TouchableOpacity>
        )
        
        let _rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={onRightButtonClick || (()=>{})}>
            {React.isValidElement(rightButton)?rightButton:<Text style={styles.navigationBarButtonText}>{rightButton}</Text>}
            </TouchableOpacity>
        )
        
        return (
            <View style={styles.navigationBar} name="navigationBar">
            {_leftButton}{_title}{_rightButton}
            </View>
        )
    }
    render(){
        const {styles} = this.props
        return (
            <View style={styles.header}>
            {Platform.OS === "ios"?<StatusBar />:null}
            {this.renderHeader()}
            </View>
        )
    }
}

export default Header
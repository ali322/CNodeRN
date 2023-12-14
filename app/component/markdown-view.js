import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image, View, StyleSheet, Text } from 'react-native'
import RNHtmlView from 'react-native-htmlview'

const screenWidth = Dimensions.get('window').width

function uniqueId(min = 1, max = 10000) {
  var range = max - min
  return min + Math.round(Math.random() * range)
}

const fontSize = 14
const rowMargin = 5
const defaultHtmlStyles = {
  image: {
    width: screenWidth - 20,
    height: screenWidth - 20,
    resizeMode: Image.resizeMode.contain
  },
  p: {
    fontSize,
    color: 'rgba(0,0,0,0.8)'
  },
  pwrapper: {
    marginTop: 5,
    marginBottom: 5
  },
  a: {
    color: 'royalblue',
    fontSize: fontSize,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 10,
    marginLeft: 10
  },
  h1: {
    fontSize: fontSize * 1.6,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
  },
  h1wrapper: {
    marginTop: rowMargin,
    marginBottom: rowMargin
  },
}

class HtmlView extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    style: PropTypes.object,
    maxImageWidth: PropTypes.number
  }
  static defaultProps = {
    maxImageWidth: screenWidth - 20,
    style: {},
    value: ''
  }
  constructor(props) {
    super(props)
    this._handleLinkPress = this._handleLinkPress.bind(this)
    this._renderNode = this._renderNode.bind(this)
    this._onImageLoadEnd = this._onImageLoadEnd.bind(this)
    this._images = {}
    const _styles = {}
    for (let key in defaultHtmlStyles) {
      if (props.style[key]) {
        _styles[key] = { ...defaultHtmlStyles[key], ...props.style[key] }
      } else {
        _styles[key] = defaultHtmlStyles[key]
      }
    }
    this._styles = StyleSheet.create(_styles)
  }
  _handleLinkPress(url) {
    Linking.canOpenURL(url)
      .then(support => {
        if (support) {
          Linking.openURL(url)
        }
      })
      .catch(err => console.log(err))
  }
  _onImageLoadEnd(uri, index) {
    const { maxImageWidth } = this.props
    Image.getSize(
      uri,
      (w, h) => {
        if (w >= maxImageWidth) {
          w = maxImageWidth
          h = maxImageWidth / w * h
        }
        this._images[index] &&
          this._images[index].setNativeProps({
            style: {
              width: w,
              height: h
            }
          })
      },
      err => {}
    )
  }
  _renderNode(node, index) {
    if (node.name == 'iframe') {
      return (
        <View key={'iframe_' + index} style={{ width: 200, height: 200 }}>
          <Text>{node.attribs.src}</Text>
        </View>
      )
    }
    if (node.name === 'img') {
      const uri = node.attribs.src
      return (
        <Image
          source={{ uri: uri }}
          style={this._styles.image}
          resizeMode="center"
          key={'img_' + index}
          onLoadEnd={() => this._onImageLoadEnd(uri, index)}
        />
      )
    }
  }
  render() {
    const { value } = this.props
    return (
      <RNHtmlView
        value={value}
        stylesheet={this._styles}
        onLinkPress={this._handleLinkPress}
        renderNode={this._renderNode}
      />
    )
  }
}

export default HtmlView

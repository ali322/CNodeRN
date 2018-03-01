import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

class Tabs extends Component {
  static defaultProps = {
    activeTab: 0,
    goToPage: () => {}
  }
  render() {
    let { activeTab } = this.props
    let count = React.Children.count(this.props.children)
    let width = screenWidth / count
    return (
      <View style={[styles.tabs, this.props.style]}>
        {React.Children.map(this.props.children, (tab, i) => {
          return (
            <TouchableOpacity
              onPress={() => this.props.goToPage(i)}
              style={[styles.tab, { width }]}
            >
              {i === activeTab
                ? React.cloneElement(tab, {
                    selected: true,
                    style: [
                      tab.props.style,
                      this.props.selectedStyle,
                      tab.props.selectedStyle
                    ]
                  })
                : tab}
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  tab: {
    // flex:1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Tabs

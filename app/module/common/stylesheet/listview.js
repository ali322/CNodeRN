import { StyleSheet } from 'react-native'

export default {
  listCell: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent'
  },
  cellSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DDD'
  },
  cellImage: {
    width: 80,
    height: 80
  },
  cellBreif: {
    paddingLeft: 8,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cellAccessory: {
    width: 50
  },
  cellTitle: {
    flex: 2
  },
  cellTitleText: {
    fontSize: 14,
    color: '#333'
  },
  cellSubtitle: {
    lineHeight: 20,
    fontSize: 12,
    color: 'dimgrey'
  }
}

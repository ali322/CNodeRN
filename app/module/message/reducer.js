import * as constants from './constant'

import { fromNow } from '../../lib/'

export function messageReducer(state = {}, action) {
  switch (action.type) {
    case constants.REQUEST_MESSAGES:
      return {
        ...state,
        messagesFetching: true
      }
    case constants.RESPONSE_MESSAGES:
      let messages = { ...action.payload.data }
      messages['has_read_messages'] = messages['has_read_messages'].map(
        message => {
          message['create_at'] = fromNow(message['create_at'])
          return message
        }
      )
      messages['hasnot_read_messages'] = messages['hasnot_read_messages'].map(
        message => {
          message['create_at'] = fromNow(message['create_at'])
          return message
        }
      )
      return {
        ...state,
        messages,
        messagesFetched: action.payload.success,
        messagesFetching: false
      }
    case constants.START_MARKALLMESSAGE:
      return {
        ...state,
        markAllMessageSaving: true
      }
    case constants.FINISH_MARKALLMESSAGE:
      return {
        ...state,
        markAllMessageSaving: false,
        markAllMessageSaved: action.payload.success,
        messageIDs: action.payload.marked_msgs
      }
    default:
      return state
  }
}

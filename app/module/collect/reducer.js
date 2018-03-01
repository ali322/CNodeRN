import * as constants from './constant'

export function collectReducer(state = {}, action) {
  switch (action.type) {
    case constants.REQUEST_COLLECT:
      return {
        ...state,
        collectFetching: true
      }
    case constants.RESPONSE_COLLECT:
      return {
        ...state,
        collectFetching: false,
        collectFetched: action.payload.success,
        collects: action.payload.data
      }
    default:
      return state
  }
}

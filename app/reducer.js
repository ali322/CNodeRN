import * as topicReducers from './module/topic/reducer'
import * as authReducers from './module/auth/reducer'
import * as commonReducers from './module/common/reducer'
import * as messageReducers from './module/message/reducer'
import * as collectReducers from './module/collect/reducer'
import * as mineReducers from './module/mine/reducer'

export default {
  ...topicReducers,
  ...messageReducers,
  ...authReducers,
  ...commonReducers,
  ...collectReducers,
  ...mineReducers
}

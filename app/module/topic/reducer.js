import * as constants from './constant'
import { fromNow } from '../../lib/'

const initialState = {
    selected: 0,
    categories: [{
            code: "",
            name: "全部",
            pageIndex: 1,
            list: []
        },
        {
            code: "good",
            name: "精华",
            pageIndex: 1,
            list: []
        },
        {
            code: "share",
            name: "分享",
            pageIndex: 1,
            list: []
        },
        {
            code: 'job',
            name: "招聘",
            pageIndex: 1,
            list: []
        }
    ]
}

export function topicsReducer(state = initialState, action) {
    let categories = [...state.categories]
    switch (action.type) {
        case constants.REQUEST_TOPICS:
            return {
                ...state,
                topicsFetching: true,
                topicsFetched: false
            }
        case constants.RESPONSE_TOPICS:
            let index = 0
            categories = categories.map((category, i) => {
                if (category.code === action.payload.code) {
                    index = i
                    category.list = [].concat(category.list, action.payload.ret.data.map((v) => {
                        v.create_at = fromNow(v.create_at)
                        return v
                    }))
                    category.pageIndex = action.payload.pageIndex
                }
                return category
            })
            return {
                ...state,
                topicsFetching: false,
                topicsFetched: action.payload.ret.success,
                selected: index,
                categories
            }
        case constants.CLEAR_TOPICS:
            categories = categories.map(category => {
                if (category.code === action.code) {
                    category.list = []
                    category.pageIndex = 1
                }
                return category
            })
            return {
                ...state,
                topicsClean: true,
                categories
            }
        default:
            return state
    }
}

export function topicReducer(state = {
    topic: { tab: "ask", title: "", content: "" }
}, action) {
    switch (action.type) {
        case constants.REQUEST_TOPIC:
            return {
                ...state,
                topicFetching: true
            }
        case constants.RESPONSE_TOPIC:
            let topic = { ...action.payload.ret.data }
            topic.create_at = fromNow(topic.create_at)
            topic.last_reply_at = fromNow(topic.last_reply_at)
            topic.replies = topic.replies.map((reply) => {
                reply.create_at = fromNow(reply.create_at)
                return reply
            })
            return {
                ...state,
                topicFetching: false,
                topicFetched: action.payload.ret.success,
                topic
            }
        case constants.START_SAVETOPIC:
            return {
                ...state,
                topicSaving: true
            }
        case constants.FINISH_SAVETOPIC:
            return {
                ...state,
                topicSaving: false,
                topicSaved: action.payload.success,
                errMsg: action.payload.err_msg,
                topicID: action.payload.topic_id
            }
        case constants.START_TOGGLECOLLECT:
            return {
                ...state,
                collectToggling: true
            }
        case constants.FINISH_TOGGLECOLLECT:
            return {
                ...state,
                collectToggling: false,
                topic: {
                    ...state.topic,
                    is_collect: action.payload.success ? !state.topic.is_collect : state.topic.is_collect
                },
                collectToggled: action.payload.success,
                errMsg: action.payload.err_msg
            }
        case constants.START_TOGGLEAGREE:
            return {
                ...state,
                agreeToggling: true
            }
        case constants.FINISH_TOGGLEAGREE:
            let _topic = { ...state.topic }
            let _replies = []
            if (action.payload.success) {
                _topic.replies.forEach((reply) => {
                    let _reply = { ...reply }
                    if (_reply.id === action.payload.replyID) {
                        if (action.payload.ret.action === "up") {
                            _reply.ups.push(action.payload.accessToken)
                        } else {
                            _reply.ups.pop()
                        }
                        _reply.agreeStatus = action.payload.ret.action
                    }
                    _replies.push(_reply)
                })
                _topic.replies = _replies
            }
            return {
                ...state,
                agreeToggling: false,
                agreeToggled: action.payload.success,
                agreeStatus: action.payload.ret && action.payload.ret.action,
                errMsg: action.payload.err_msg,
                topic: _topic
            }
        case constants.START_SAVEREPLY:
            return {
                ...state,
                replySaving: true
            }
        case constants.FINISH_SAVEREPLY:
            return {
                ...state,
                replySaving: false,
                replySaved: action.payload.success,
                errMsg: action.payload.err_msg,
                replyId: action.payload.reply_id
            }
        default:
            return state
    }
}
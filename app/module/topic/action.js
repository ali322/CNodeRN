import * as constants from './constant'
import { request } from '../../lib/'
import api from '../../lib/api'
import { failRequest } from '../common/action'

function clearTopics(code) {
    return {
        type: constants.CLEAR_TOPICS,
        code
    }
}

function requestTopics() {
    return {
        type: constants.REQUEST_TOPICS
    }
}

function responseTopics(payload) {
    return {
        type: constants.RESPONSE_TOPICS,
        payload,
        respondAt: Date.now()
    }
}

export function fetchTopics(params = {}) {
    let { code = "", pageIndex = 1, pageSize = 10, clear = false } = params
    if (clear) {
        dispatch(clearTopics())
    }

    return (dispatch) => {
        dispatch(requestTopics())
        request.get(api.topics, {
            params: {
                tab: code,
                page: pageIndex,
                limit: pageSize
            }
        }).then(ret => {
            dispatch(responseTopics({ ret: ret.data, code, pageIndex }))
        }).catch(err => {
            dispatch(failRequest(err))
        })
    }
}

function requestTopic() {
    return {
        type: constants.REQUEST_TOPIC,
    }
}

function responseTopic(payload) {
    return {
        type: constants.RESPONSE_TOPIC,
        payload,
        respondAt: Date.now()
    }
}

export function fetchTopic(id) {
    return (dispatch) => {
        dispatch(requestTopic())
        request.get(`${api.topic}/${id}`)
            .then((ret) => {
                dispatch(responseTopic({ ret: ret.data, id }))
            }).catch(err => dispatch(failRequest(err)))
    }
}

function startSaveReply() {
    return {
        type: constants.START_SAVEREPLY
    }
}

function finishSaveReply(payload) {
    return {
        type: constants.FINISH_SAVEREPLY,
        payload,
        finishAt: Date.now()
    }
}

export function saveReply({ id, reply }) {
    return (dispatch) => {
        dispatch(startSaveReply())
        request.post(`${api.reply2topic}/${id}/replies`, { ...reply }).then((ret) => {
            ret = ret.data
            dispatch(finishSaveReply(ret))
        }).catch(err => {
            dispatch(finishSaveReply({
                success: false,
                err_msg: '回复失败'
            }))
        })
    }
}

function startSaveTopic() {
    return {
        type: constants.START_SAVETOPIC
    }
}

function finishSaveTopic(payload) {
    return {
        type: constants.FINISH_SAVETOPIC,
        payload,
        finishAt: Date.now()
    }
}

export function saveTopic(topic) {
    return dispatch => {
        dispatch(startSaveTopic())
        request.post(api.topics, { ...topic }).then((ret) => {
            ret = ret.data
            dispatch(finishSaveTopic(ret))
        }).catch((err) => {
            dispatch(finishSaveTopic({
                success: false,
                err_msg: "发布失败"
            }))
        })
    }
}

function startToggleCollect() {
    return {
        type: constants.START_TOGGLECOLLECT
    }
}

function finishToggleCollect(payload) {
    return {
        type: constants.FINISH_TOGGLECOLLECT,
        payload,
        finishAt: Date.now()
    }
}

export function toggleCollect(params) {
    let { topicId, accessToken, isCollected = true } = params
    return dispatch => {
        dispatch(startToggleCollect())
        const apiURL = !isCollected ? api.addCollect : api.delCollect
        request.post(apiURL, {
            accesstoken: accessToken,
            topic_id: topicId
        }).then((ret) => {
            ret = ret.data
            dispatch(finishToggleCollect({ isCollected, ...ret }))
        }).catch(err => {
            dispatch(finishToggleCollect({
                success: false,
                err_msg: "收藏失败"
            }))
        })
    }
}

function startToggleAgree() {
    return {
        type: constants.START_TOGGLEAGREE
    }
}

function finishToggleAgree(payload) {
    return {
        type: constants.FINISH_TOGGLEAGREE,
        payload,
        finishAt: Date.now()
    }
}

export function toggleAgree({ replyID, accessToken }) {
    return dispatch => {
        dispatch(startToggleAgree())
        request.post(`${api.agreeReply}/${replyID}/ups`, {
            accesstoken: accessToken
        }).then((ret) => {
            ret = ret.data
            dispatch(finishToggleAgree({ replyID, accessToken, ret, success: ret.success }))
        }).catch(err => {
            dispatch(finishToggleAgree({
                success: false,
                err_msg: "点赞失败"
            }))
        })
    }
}
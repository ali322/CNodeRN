'use strict'

const apiHost = "http://cnodejs.org/api/v1"

export default {
    topics:`${apiHost}/topics`,
    topic:`${apiHost}/topic`,
    reply2topic:`${apiHost}/topic`,
    addCollect:`${apiHost}/topic_collect/collect`,
    delCollect:`${apiHost}/topic_collect/de_collect`,
    userCollect:`${apiHost}/topic_collect`,
    agreeReply:`${apiHost}/reply`,
    
    authorize:`${apiHost}/accesstoken`,
    user:`${apiHost}/user`,
    messages:`${apiHost}/messages`,
    messageCount:`${apiHost}/message/count`,
    markAllMessage:`${apiHost}/message/mark_all`
}
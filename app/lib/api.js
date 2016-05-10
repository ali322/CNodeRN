'use strict'

const apiHost = "http://cnodejs.org/api/v1"

export default {
    topics:`${apiHost}/topics`,
    topic:`${apiHost}/topic`,
    reply2topic:`${apiHost}/topic`,
    
    authorize:`${apiHost}/accesstoken`,
    user:`${apiHost}/user`,
    messages:`${apiHost}/messages`,
    messageCount:`${apiHost}/message/count`,
    markAllMessage:`${apiHost}/message/mark_all`
}
'use strict'

let messages = {
    has_read_messages: [],
    hasnot_read_messages: []
}

for (let i = 0; i < 10; i++) {
    messages.has_read_messages.push({
        id: "543fb7abae523bbc80412b26",
        type: "at",
        has_read: false,
        author: {
            loginname: "alsotang",
            avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
        },
        topic: {
            id: "542d6ecb9ecb3db94b2b3d0f",
            title: "adfadfadfasdf",
            last_reply_at: "2014-10-18T07:47:22.563Z"
        },
        reply: {
            id: "543fb7abae523bbc80412b24",
            content: "[@alsotang](/user/alsotang) 哈哈",
            ups: [],
            create_at: "6天前"
        }
    })
    messages.hasnot_read_messages.push({
        id: "543fb7abae523bbc80412b26",
        type: "at",
        has_read: false,
        author: {
            loginname: "alsotang",
            avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
        },
        topic: {
            id: "542d6ecb9ecb3db94b2b3d0f",
            title: "adfadfadfasdf",
            last_reply_at: "6天前"
        },
        reply: {
            id: "543fb7abae523bbc80412b24",
            content: "[@alsotang](/user/alsotang) 哈哈",
            ups: [],
            create_at: "6天前"
        }
    })
}

export default messages
import moment from 'moment'
export request from 'axios'

export function fromNow(time){
    moment.updateLocale('en',{
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            m : '1 分钟',
            mm : '%d 分钟',
            h : '1 小时',
            hh : '%d 小时',
            d : '1 天',
            dd : '%d 天',
            M : '1 个月',
            MM : '%d 个月',
            y : '1 年',
            yy : '%d 年'
        }
    })
    return moment(time).fromNow()
}

export function formatTime(time,format="YYYY-MM-DD"){
    return moment(time).format(format)
}
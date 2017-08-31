/*
    addQuery('itemId', 11, 'userId', 1)
    return
        ?itemId=11&userId=1
 */
function addQuery(...params) {
    let paramsRet = [];
    params.map(function(obj, idx) {
        if (idx % 2 == 0) {
            paramsRet.push(params[idx] + '=' + params[idx + 1]);
        }
    })
    return '?' + paramsRet.join('&');
}

function setUserId() {}

function setTags() {

    let tags = [
        '书籍',
        '彩妆',
        '手机',
        '电脑',
        '服装',
        '鞋子',
        '装饰',
        '数码',
        '交通工具',
        '生活用品',
        '文体用品'
    ];

    tags.map(function(obj, idx) {
        let name = 'tag' + idx;
        let value = tags[idx - 1];
        localStorage.setItem(name, value);
    })
}

function getTag(tagId) {
    let name = 'tag' + tagId;
    let tag = localStorage.getItem(name);
    if (!tag) {
        setTags();
    }
    return localStorage.getItem(name);
}

/**
 * 返回 2017-08-01
 */
function formatDate(date) {
    var date = new Date(date); //如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10
        ? '0' + (date.getDate())
        : date.getDate()) + ' ';
    var h = (date.getHours() < 10
        ? '0' + date.getHours()
        : date.getHours()) + ':';
    return Y + M + D;
}

function getTimeGap(from, to) {

    from = new Date(Date.parse(from));
    to   = new Date(Date.parse(to));


    var timeGapMs      =  to.getTime() - from.getTime(),                 //时间差的毫秒数
        days           =  Math.floor(timeGapMs / (24 * 3600 * 1000)),
        subDaysLeftMs  =  timeGapMs % (24 * 3600 * 1000),                //计算天数后剩余的毫秒数
        hours          =  Math.floor(subDaysLeftMs / (3600 * 1000)),
        subHoursLeftMs =  subDaysLeftMs % (3600 * 1000),                 //计算小时数后剩余的毫秒数
        minutes        =  Math.floor(subHoursLeftMs / (60 * 1000)),
        subMinutesLeft =  subHoursLeftMs % (60 * 1000),                  //计算分钟数后剩余的毫秒数
        seconds        =  Math.round(subMinutesLeft / 1000),
        months         =  parseInt(days / 30);

    if (months) {
        return months + "个月";
    } else if (days) {
        return days + "天";
    } else if (hours) {
        return hours + "个小时";
    } else if (minutes) {
        return minutes + "分钟";
    } else {
        return seconds + "秒";
    }

}
exports.Util = {
    addQuery,
    setUserId,
    setTags,
    getTag,
    formatDate,
    getTimeGap,
}

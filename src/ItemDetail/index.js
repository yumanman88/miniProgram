import React from 'react';
import './index.styl';
import Header from './header/index.js'
import {Util} from '../common/js/util.js'
import MsgItem from './msgItem/index.js';
import {imgUrl} from '../imgUrl';
class ItemDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            itemId: 0,
            images: [],
            tags  : [],
            itemEntity: null,
            msgList: [],
            relation: {
                starNum: 4,
                socialRelation: "好友",
                commonFriends: 10
            },
            userInfo: {
                nickname: "小可爱",
            },
            isCollect: 0, // 0代表没有收藏
            userIntimacy: 0
        };
        this.itemId = localStorage.getItem("itemId");
    }

    // 取用户之间的关系
    getUserRelateInfo(userId, relevanceId) {
        fetch('/api/user/relevance' + Util.addQuery('userId', userId, 'relevanceId', relevanceId), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache'
        }).then(res => {
            return res.json();
        }).then(res => {
            let info = res.data;
            // 判断要给用户评分多少个星
            info.starNum = parseInt((info.points / 20.0));
            console.log(info)
            this.setState({
                relation: info
            });
        }).catch(err => {
            console.log(err);
        })

    }

    dealMsgList(msgList) {
        let newMsgList = [];
        console.log(msgList);
        msgList.map(function(obj, idx) {
            let user = obj.user,
                other = obj.other;
            obj.simpleMessages.map(function(obj, idx) {
                let msgObj = {};
                let timeGap = Util.getTimeGap(obj.createDate, new Date());
                // 如果是第一条数据, type 是msg
                msgObj.type = (idx == 0) ? 'msg' : 'reply';
                if(obj.speaker == other.id) {
                    msgObj.name    = other.nickname;
                    msgObj.imgUrl  = other.imgUrl;
                } else {
                    msgObj.name    = user.nickname;
                    msgObj.imgUrl  = user.imgUrl;
                }
                msgObj.msg = obj.msg;
                msgObj.timeGap = timeGap;
                newMsgList.push(msgObj);
            })
        });
        return newMsgList;

    }

    componentWillMount() {

        const itemId = this.itemId;
        const userId =  parseInt(localStorage.getItem("userId"));

        // 取商品的信息
        fetch("/api/items/view" + Util.addQuery('itemId', itemId, 'userId', userId), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        }).then(res => {
            return res.json();
        }).then(res => {
            let itemInfo = res.data.itemInfo;
            let itemEntity = itemInfo.itemEntity;
            let tags = itemInfo.tags.map(function(obj, idx) {
                return Util.getTag(obj);
            })
            console.log(itemInfo)
            this.setState({
                images : itemInfo.images,
                tags   : tags,
                itemEntity: itemEntity,
            })

            const relevanceId = itemEntity.userId;
            this.getUserRelateInfo(userId, relevanceId);

        }).catch(err => {
            console.log(err);
        })

        // 取留言信息
        // fetch("/api/message/itemMsg" + Util.addQuery('itemId', itemId, 'userId', userId), {
        fetch("/api/message/itemMsg" + Util.addQuery('itemId', itemId, 'userId', userId), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            let msgList = res.data;
            console.log("origin msgList", msgList);
            msgList = this.dealMsgList(msgList);
            console.log(msgList);
            this.setState({
                msgList : msgList,
            })
        }).catch(err => {
            console.log(err);
        })

        // 取用户的信息
        fetch('/api/user/qqInfo' + Util.addQuery("userId", userId), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        }).then(res => {
            return res.json();
        }).then(res => {
            let userInfo = res.data.qqInfo;
            console.log(userInfo)
            this.setState({
                userInfo: userInfo,
            })
        }).catch(err => {
            console.log(err);
        });

        fetch('/api/items/userIntimacy' + Util.addQuery('itemId', itemId, 'userId', userId), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        }).then(res => {
            return res.json();
        }).then(res => {
            let userIntimacy = res;
            this.setState({
                userIntimacy: userIntimacy
            })
        }).catch(err => {
            console.log(err);
        });

        // 确认用户是否收藏该页面
        // fetch('/api/user/relevance' + Util.addQuery('userId', userId, 'itemId', itemId), {
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     cache: 'no-cache'
        // }).then(res => {
        //     return res.json();
        // }).then(res => {
        //     isCollect
        //     this.setState({
        //         isCollect: isCollect
        //     });
        // }).catch(err => {
        //     console.log(err);
        // })

        //TODO
        // fetch('/api/message/itemMsg' + Util.addQuery('itemId', itemId, 'userId', userId), {
        // fetch('/api/message/itemMsg' + Util.addQuery('itemId', 12, 'userId', 13), {
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     cache: 'no-cache',
        // }).then(res => {
        //     return res.json();
        // }).then(res => {
        //     let msgList = res.data;
        //     console.log(msgList)
        // }).catch(err => {
        //     console.log(err);
        // });


    }



    componentDidMount() {}

    // TODO
    // 1、亲密度
    // 2、msgList

    render() {

        let stars = [];
        for(let i = 0; i < this.state.relation.starNum; i++)
            stars.push(<span className="star" key={i}></span>);

        return (
            <div className="Item-Detail">
                <Header images={this.state.images}
                        tags={this.state.tags}
                        isCollect={this.state.isCollect}
                        itemEntity={this.state.itemEntity}
                        itemId={this.itemId}
                />
                <div className="users-wrap">
                    <div className="users">
                        <img className="avatar" src={`${imgUrl}${"avatar.png"}`}/>
                        <div className="users-info">
                            <p className="name">渐离</p>
                            <p className="intimacy">亲密度：31.38
                                <span className="love-icon"></span>
                            </p>
                        </div>
                    </div>
                    <div className="relate-info">
                        <p>她跟你有个4共同好友</p>
                        <p>她跟你是{this.state.relation.socialRelation}</p>
                        <p>她的友市评分：
                            {stars}
                        </p>
                    </div>
                </div>
                <div className="message-board">
                    <div className="top">留言板</div>
                    {
                        this.state.msgList.map(function(obj, idx) {
                            return <MsgItem msgInfo={obj} key={idx}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ItemDetail;

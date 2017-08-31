import React from 'react';
import './index.styl';
import {Util} from '../../common/js/util.js'
import {imgUrl} from '../../imgUrl.js'

class MsgItem extends React.Component {
    constructor() {
        super();
        this.state = {
        }

    }

    render() {
        let msgInfo = this.props.msgInfo;

        if(msgInfo.type == 'msg') {
            return (
                <div className="MsgItem">
                    <div className="msg">
                        <div className="user-info">
                            <img className="avatar" src={`http://${msgInfo.imgUrl}`} />
                            <p className="name">{msgInfo.name}</p>
                        </div>
                        <p className="user-msg">{msgInfo.msg}</p>
                        <p className="time">{msgInfo.timeGap}前</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="MsgItem">
                    <div className="reply">
                        <div className="user-info">
                            <img className="avatar" src={msgInfo.imgUrl} />
                            <p className="name">{msgInfo.name}</p>
                        </div>
                        <p className="user-msg">{msgInfo.msg}</p>
                        <p className="time">{msgInfo.timeGap}前</p>
                    </div>
                </div>
            )
        }

    }
}

export default MsgItem;

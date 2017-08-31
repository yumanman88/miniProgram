import React from 'react';
import './index.styl';
import {Util} from '../../common/js/util.js'
import {imgUrl} from '../../imgUrl.js'

class Item extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    componentDidMount() {}

    handleDeleteClick() {
        let total = document.getElementById('total');
        let itemId = total.getAttribute('data-ItemId');
        itemId = '['+ itemId +']';

        fetch('/api/collection/cancel' + Util.addQuery('itemId', itemId, 'userId', parseInt(localStorage.getItem('userId'))), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            alert("删除成功");
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        // <div className="intimacy">
        //     <div className="img"></div>
        //     90
        // </div>

        let itemInfo = this.props.itemInfo;
        console.log(itemInfo)
        return (
            <div className="Collect-Item-Wrap">
                <div className="item" id="total" data-ItemId={itemInfo.itemId}>
                    <img className="img" src={`${imgUrl}${itemInfo.imageUrl}`}/>
                    <div className="info-wrap">
                        <div className="user-wrap">
                            <div className="user-info">
                                <div className="avatar"></div>
                                <div className="name">{itemInfo.nickname}</div>
                            </div>

                        </div>
                        <p className="detail">{itemInfo.detail}fdsafdsafdsafdafdsafafasdfasdfasdfasfadssd</p>
                        <p className="tags">
                                {
                                    itemInfo.tagIds.map(function(obj, idx) {
                                        return '#' + Util.getTag(obj) + ' ';
                                    })
                                }
                            <span className="delete" onClick={this.handleDeleteClick}></span>
                        </p>
                        <div className="price-wrap">
                            <span className="price">¥ {itemInfo.price}</span>
                            <span className="time">{Util.formatDate(itemInfo.createDate)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item;

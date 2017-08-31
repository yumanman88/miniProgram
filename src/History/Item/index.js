import React from 'react';
import './index.styl';
import {Util} from '../../common/js/util.js'
import {imgUrl} from '../../imgUrl.js'

class Item extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick() {
        let total = document.getElementById('total');
        let itemId = total.getAttribute('data-ItemId');
        let deleteIds = '['+ itemId +']';

        fetch('/api/browse/delete' + Util.addQuery('deleteIds', deleteIds, 'userId', parseInt(localStorage.getItem('userId'))), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        }).then(res => {
            if(res.status == 200)
                alert("删除成功");
        }).catch(err => {
            console.log(err);
        });


    }

    componentDidMount() {}

    render() {
        let itemInfo = this.props.itemInfo;

        return (
            <div className="History-Item-Wrap">
                <div className="item" id="total" data-ItemId={itemInfo.itemId}>
                    <img className="img" src={`${imgUrl}${itemInfo.imageUrl}`}/>
                    <div className="info-wrap">
                        <p className="detail">{itemInfo.detail}</p>
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

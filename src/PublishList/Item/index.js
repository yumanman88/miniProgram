import React from 'react';
import style from './index.styl';
import {Util} from '../../common/js/util.js'
import {imgUrl} from '../../imgUrl.js'
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:true,off:true}
        this.handleModifyClick = this.handleModifyClick.bind(this)
        this.handleOfflineClick = this.handleOfflineClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleModifyClick() {
        // /api/items/offline
    }

    handleOfflineClick() {
        this.setState({off:false})
    }

    handleDeleteClick() {
        this.setState({show:false})
    }

    componentDidMount() {}

    render() {

        let itemInfo = this.props.itemInfo;
        console.log(itemInfo)

        // <span className="view-counts">浏览10次</span>

        return (
            <div style={{display:this.state.show?'block':'none'}} className="PublishList-Item-Wrap">
                <div className="item">
                   <img src={`${imgUrl}${itemInfo.images[0]}`} style={{width:'30vw',height:'30vw'}}/>
                    <div className="info-wrap">
                        <p className="detail">{itemInfo.detail}</p>
                        <p className="tags">
                            {
                                itemInfo.tags.map(function(obj, idx) {
                                    return '#' + Util.getTag(obj) + ' ';
                                })
                            }
                        </p>
                        <div className="price-wrap">
                            <span className="price">¥ {itemInfo.price}</span>
                            <span className="time">{Util.formatDate(itemInfo.createDate)}</span>
                        </div>
                    </div>
                </div>
                <div className="btn-wrap">
                    <button onClick={this.handleDeleteClick} onClick={()=>{location.href=`/#/?itemModify=${itemInfo.itemId}`}}>修改</button>
                    <button onClick={this.handleOfflineClick}>{this.state.off?(<span>上架</span>):(<span>下架</span>)}</button>
                    <button onClick={this.handleDeleteClick}>删除</button>
                </div>
            </div>
        )
    }
}

export default Item;

import React from 'react';
import './index.styl';
import Hoc from '../hoc/index.js'
import {config} from '../../config/config.js'
import {Util} from '../../common/js/util.js'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isCollect: 0,
            collectClass: "collectOwn not-collect",
        }
        this.handleCollectClick = this.handleCollectClick.bind(this);


    }

    handleCollectClick() {
        //增加或者删除 class="collect"
        let collectBtn = document.getElementById('collectBtn');

        if(this.state.isCollect == 0) {

            this.setState({
                isCollect : 1
            });

            collectBtn.setAttribute("class", "collectOwn collect");

            console.log(this.props.itemId)

            fetch('/api/collection/add' + Util.addQuery("userId", parseInt(localStorage.getItem("userId")), "itemId", this.props.itemId), {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache',
            }).then(res => {
                if(res != void 0) {
                    return res.json();
                }
            }).then(res => {
                alert("收藏成功!");
            }).catch(err => {
                console.log(err);
            });

        } else {
            this.setState({
                isCollect : 0
            });
            collectBtn.setAttribute("class", "collectOwn not-collect");

            fetch('/api/collection/cancel' + Util.addQuery('userId', parseInt(localStorage.getItem("userId")), 'itemId', this.props.itemId), {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache',
            }).then(res => {
                if(res != void 0) {
                    return res.json();
                }
            }).then(res => {
            }).catch(err => {
                console.log(err);
            });

        }
        console.log(collectBtn);
    }

    componentDidMount() {
        fetch('/api/collection/checkCollectState' + Util.addQuery("userId", parseInt(localStorage.getItem("userId")), "itemId", this.props.itemId), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        }).then(res => {
            if(res != void 0) {
                return res.json();
            }
        }).then(res => {
            let isCollect = res.data;

            this.setState({
                isCollect: isCollect,
            });

            if(isCollect == 0) {
                this.setState({
                    collectClass : "collectOwn not-collect",
                })
            } else {
                this.setState({
                    collectClass : "collectOwn collect",
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const imgsUrl = this.props.images;

        return (
            <div className="Item-Detail-Header">
                <div className="items">
                    <Hoc imgs={imgsUrl}/>
                    <div className="tags-times">
                        <span>
                        {
                            this.props.tags.map(function(obj, idx) {
                                return '#'+obj + ' ';
                            })
                        }
                        </span>
                        <span>
                        {
                            this.props.itemEntity == void 0 ? "" : Util.formatDate(this.props.itemEntity.updateDate)
                        }
                        </span>
                    </div>
                    <p className="short-desc">{this.props.itemEntity == void 0 ? "" : this.props.itemEntity.title}</p>
                    <div className="price">
                        <span id="now-price">¥ {this.props.itemEntity == void 0 ? "" : this.props.itemEntity.price}</span>
                        <span id="origin-price">¥ {this.props.itemEntity == void 0 ? "" : this.props.itemEntity.originalPrice}</span>
                        <span onClick ={this.handleCollectClick}  id="collectBtn" className={this.state.collectClass} ></span>
                    </div>
                    <p className="desc">{this.props.itemEntity == void 0 ? "" : this.props.itemEntity.detail}</p>
                </div>
            </div>
        )
    }
}

export default Header;

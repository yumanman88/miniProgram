import React from 'react';
import Item from './Item/index.js'
import {Util} from '../common/js/util.js'

class Collect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        const userId = parseInt(localStorage.getItem('userId'));

        // 获取用户收藏列表
        fetch('/api/collection/list' + Util.addQuery("userId", 522, "pageNum", 0), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache'
        }).then(res => {
            return res.json();
        }).then(res => {
            let items = res.data.items;
            console.log(items);
            this.setState({
                items: items
            })
        }).catch(err => {
            console.log(err);
        });

    }
    componentWillMount() {

    }

    componentDidMount() {}

    render() {
        return (
            <div>
                {this.state.items.map(function(obj, idx) {
                    return < Item itemInfo = {obj} key={idx} />
                })}
            </div>
        )
    }
}

export default Collect;

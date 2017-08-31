import React from 'react';
import Item from './Item/index.js'
import {Util} from '../common/js/util.js'

class PublishList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [],
        }

        // fetch('/api/items/list' + Util.addQuery('userId', parseInt(localStorage.getItem("userId"))), {
        // TODO记得删了
        fetch('/api/items/list' + Util.addQuery('userId', 522), {
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
            this.setState({
                items : items,
            })
            console.log(items)
        }).catch(err => {
            console.log(err);
        });

    }

    componentDidMount() {}

    render() {
        console.log(this.state.items)
        return (
            <div>
                {
                    this.state.items.map(function(obj, idx) {
                        return <Item itemInfo={obj} key={idx}/>
                    })
                }
            </div>
        )
    }
}

export default PublishList;

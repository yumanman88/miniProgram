import React from 'react';
import style from './index.css';
import {
  toJS
} from 'immutable';
import {
  imgUrl
} from '../imgUrl.js';
import HomeItem from '../HomeItem/index';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: localStorage.getItem('history'),
      show: true
    };
    this.historyClear = this.historyClear.bind(this);
    this.hideHistory = this.hideHistory.bind(this);
  }

  componentDidMount() {
    this.props.searchChange('')();
  }

  historyClear() {
    this.setState({
      history: null
    })
  }

  hideHistory() {
    this.setState({
      show: false
    })
  }


  render() {
    const { searchChange, keyword, requestHomeData } = this.props;
    const items = this.props.items.toJS();
    return (
      <div>
        <div className={style.nav}>
          <input
            onChange={e => { searchChange(e.target.value)() }}
            value={keyword}
            className={style.input}
            placeholder="输入关键字搜索"
            type="text" />
          <img
            className={style.img}
            src={`${imgUrl}search/search.png`}
            onClick={this.props.keyword===''?null:() => {
              localStorage.setItem("history", localStorage.getItem("history") ? (`${keyword};;;${localStorage.getItem("history")}`) : `${keyword};;;`);
              requestHomeData(keyword)()
              this.hideHistory()
            }} />
          </div>
          <div style={{ display: this.state.show ? "block" : "none" }}>
          <div className={style.title}>
            <span>历史记录</span>
            <img src={`${imgUrl}search/clear.png`} onClick={e => { localStorage.removeItem("history"); this.historyClear() }} />
          </div>
          {
            this.state.history === null ? null :
              (
                <div>
                  <div className={style.history}>
                    {
                      this.state.history.split(";;;").map((value, index) =>
                        (value === '' ? null :
                          (<span key={index} className={style.item} onTouchStart={e => { requestHomeData(value)(); this.props.history.push('/?keyword'); }}>{value}</span>)))
                    }
                  </div>
                </div>)
          }
         </div>
         <div className={style.items}>
           {items.map((value, index) => (<HomeItem key={index} item={value} />))}
         </div>
       </div>
    )
  }
}


export default Search;
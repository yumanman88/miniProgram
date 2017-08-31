import React from 'react';
import style from './index.css';
import HomeItem from '../HomeItem/index'
import {
  toJS
} from 'immutable';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '1'
    }
    this.selectTag = this.selectTag.bind(this);
    localStorage.setItem("userId", 522);
  }

  selectTag() {
    return (id) => {
      this.setState({
        selected: id
      })
    }
  }

  componentDidMount() {
    if (location.hash.split('?').length === 1) {
      this.props.requestHomeData(['1'], '111')();
    }
  }

  render() {
    const items = this.props.items.toJS();
    console.log(items);
    const length = items.length;
    const tags = ['推荐','书籍', '彩妆', '手机', '电脑', '服装', '生活用品', '数码产品', '交通工具', '文体用品', '鞋子', '装饰'];
    return (
      <div>
        <div className={style.main}>
          <div className={style.nav}>
            {tags.map((value, index) =>
              (
                <span onClick={e => { this.selectTag()((index + 1).toString()); this.props.requestHomeData([(index + 1).toString()], '1')() }} key={index} className={this.state.selected === (index + 1).toString() ? `${style.tag} ${style.selected}` : style.tag}>
                  {value}
                  <div className={this.state.selected === (index + 1).toString() ? (value.length === 4 ? style.borderSpec : style.border) : null}></div>
                </span>
              ))}
          </div>
          <div className={style.items}>
            {items.map((value, index) => (<HomeItem key={index} item={value}/>))}
          </div>
        </div>
      </div>
    )
  }
}


export default Home;

import React from 'react';
import style from './index.css';
import {
  toJS
} from 'immutable';
import {
  imgUrl
} from '../imgUrl.js';
import HomeItem from '../HomeItem/index';

class otherHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { 
    this.props.requestHomeData('1')();
    this.props.requestInfoData('1')();
    this.props.requestRelevanceData('1')();
  }

  render() {
    //const {  } = this.props;
    const items = this.props.items.toJS();
    const info=this.props.info.toJS();
    const relevance=this.props.relevance.toJS();
    const node=[<span>友市评分 </span>];
    for(let i=0;i<parseInt(relevance.points/20);i++){
      node.push(< img className={style.star} key={i} src={`${imgUrl}${"otherHome/star.png"}`} alt=""/>);
    }
    return (
        <div>
          <div className={style.header}>
            <img className={style.background} src={`${imgUrl}/otherHome/background.png`}/>
            <div className={style.info}>
              <img className={style.avatar} src={`${imgUrl}avatar.png`} />
              <div className={style.nickname}>{info.nickname}</div>
            </div>    
          </div>
            {
                <div className={style.list}>
                  <div className={style.item}><img src={`${imgUrl}/otherHome/qq.png`} className={style.icon}/><div className={style.content}>{`${info.nickname}`}</div></div>
                  <div className={style.item}><img src={`${imgUrl}/otherHome/info.png`} className={style.icon}/><div className={style.content}>{`${info.gender===0?'女':'男'} ${info.age}岁 ${info.constellation}`}</div></div>
                  <div className={style.item}><img src={`${imgUrl}/otherHome/address.png`} className={style.icon}/><div className={style.content}>{info.nativePlace}</div></div>
                  <div className={style.item}><img src={`${imgUrl}/otherHome/friends.png`} className={style.icon}/><div className={style.content}>{`${info.gender===0?'她':'他'}跟你有${relevance.commonFriends}个共同好友`}</div></div>
                  <div className={style.item}><img src={`${imgUrl}/otherHome/school.png`} className={style.icon}/><div className={style.content}>{relevance.socialRelation}</div></div>
                  <div className={style.item}><img src={`${imgUrl}/otherHome/grade.png`} className={style.icon}/><div className={style.content}>{node}</div></div>
                </div>
            }
            <div className={style.bar}></div>
            <div className={style.title}>TA发布过的</div>
           <div className={style.items}>
             {items.map((value, index) => (<HomeItem key={index} item={value} />))}
           </div>
        </div>
    )
  }
}


export default otherHome;
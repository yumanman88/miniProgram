import React from 'react';
import style from './index.css';
import {
  toJS
} from 'immutable';
import {
  imgUrl
} from '../imgUrl.js';
import {Util} from '../common/js/util';
import {url} from '../url.js';

const HomeItem = (props) => {
  const item = props.item;
  return (
    <div>
      <div className={style.main} onClick={()=>{localStorage.setItem("itemId", item.itemId); location.href=`${url}itemDetail?itemid=${item.itemId}&ios=gonext`}}>
      {/*个人信息*/}
        <div className={style.info}>
          <img src={`http://${item.userImg}`} className={style.avatar}
               onClick={(e)=>{console.log('1');location.href=`${url}otherHome?userId=${item.userId}&ios=gonext`;e.stopPropagation();e.preventDefault()}}
          />
          <div className={style.infoItem1}>
            <div className={style.nickName}>{item.nickname}</div>
            <div className={style.intimacy}>亲密度：{(item.intimacy*100  + '').slice(0, 5)}<img src={`${imgUrl}love.png`} className={style.love}/></div>
          </div>
          <div className={style.infoItem2}>
            <div className={style.price}>{'¥'+item.price}</div>
            <div className={style.date}>2017.07.01</div>
          </div>
        </div>
      { /*图片展示*/ }
        <div>
          {item.images.map(
            (value,index)=>(<img key={index} className={style.item} src={`${imgUrl}${value}`}/>)
          )}
        </div>
      { /*详情*/ }
        <div>
          {item.tags.map(
            (value,index)=>(<span key={index} className={style.type}>{"#"+Util.getTag(value)}</span>)
          )}
          <p className={style.detail}>{item.detail}</p>
        </div>
      </div>
    </div>
  )
};


export default HomeItem;
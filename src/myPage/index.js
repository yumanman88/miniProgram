import React from 'react';
import style from './index.css';
import {toJS} from 'immutable';
import {imgUrl} from '../imgUrl.js'
import {url} from '../url.js'

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	      userId: window.localStorage.getItem('userId')
	    }
	    this.logout = this.logout.bind(this);
	}
	logout(e){
		let result = confirm("确认要退出吗？")
		if(result==true){
			this.setState({userId:''});
			localStorage.setItem('userId',"");
			setTimeout(()=>{window.location='/Home'},20);
		}
	}
	componentWillMount(){
        this.setState({
            userId: localStorage.getItem("userId"),
            itemId:localStorage.getItem("itemId"),
        });
		let userId = this.state.userId;
		if(!userId){
			alert("没有登录，将跳转")
			setTimeout(()=>{window.location.href='/Home'}, 100);
		}
		else{
			this.props.requestQQInfo({userId})();
		}
	}
	componentDidMount(){

	}
	render(){
		const infoData = this.props.infoData.toJS().qqInfo;
		console.log(this.props.infoData.toJS());
		const userId = this.props.userId;
		const list = [
            {"iconUrl":"otherHome/myPublish.png","titleTxt":"我的发布","clickUrl":"publishList"},
            {"iconUrl":"otherHome/star.png","titleTxt":"我的收藏","clickUrl":"collect"},
            {"iconUrl":"otherHome/history.png","titleTxt":"历史浏览","clickUrl":"history"},
            {"iconUrl":"otherHome/message.png","titleTxt":"留言动态","clickUrl":"myMsg"}
        ];
		const points = parseInt(infoData.point)/20;
		const order = ["qqNum","gender","age","constellation","nativePlace"];
		const node=[];
		for(let i=0;i<points;i++){
			node.push(<img key={i} src={`${imgUrl}${"otherHome/star.png"}`} alt=""/>);
		}
		return (
			<div className={style.main}>
				<div className={style.topCon}>
			        <div className={style.topBar}>
			            <div></div>
			            <div className={style.titleTxt}><span></span></div>
			            <div className={style.logout} ><span></span></div>
			        </div>
			        <div className={style.photo}>
			            <img src={`${"http://"}${infoData.imgUrl}`} alt=""/>
			            <p><input type="text" value={infoData.nickname}/></p>
			            <div className={style.edit}><img src="http://youshi-1253746847.cosgz.myqcloud.com/otherHome/edit.jpg" alt=""/></div>
			        </div>
    			</div>
    			<div className={style.middleCon}>
					<div>
							<div><img src={`${imgUrl}${"otherHome/qq.png"}`} alt=""/></div>
							<p>{infoData.nickname}</p>
					</div>
					<div>
							<div><img src={`${imgUrl}${"otherHome/info.png"}`} alt=""/></div>
							<p>{infoData.gender+" "+infoData.age+"岁 "+infoData.constellation+" "+infoData.nativePlace}</p>
					</div>
					<div>
							<div><img src={`${imgUrl}${"otherHome/address.png"}`} alt=""/></div>
							<p>{infoData.nativePlace}</p>
					</div>
					<div>
			            <div><img src={`${imgUrl}${"otherHome/points.png"}`} alt=""/></div>
			            <p>友市评分</p>
			            <div>
			            	{node}
			            </div>
        			</div>
				</div>

				<div className={style.bottomCon}>
					{
						list.map((value,index)=>(
							<div key={index} onClick={()=>{location.href=`${url}${value.clickUrl}?userId=1&ios=gonext`}}>
								<div><img src={`${imgUrl}${value.iconUrl}`} alt={value.titleTxt}/></div>
								<div className={style.titleTxt}><span>{value.titleTxt}</span></div>
								<div className={style.nav}><img src={`${imgUrl}${'otherHome/'}${"open.png"}`} alt=''/></div>
							</div>
						))
					}
				</div>
			</div>
		)
	}
}
export default Home;

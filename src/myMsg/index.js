import React from 'react';
import style from './index.css';
import {toJS} from 'immutable';
import {imgUrl} from '../imgUrl.js'
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	      userId: window.localStorage.getItem('userId'),
	      itemId: window.localStorage.getItem('itemId')
	    }
	    this.deleteMessage = this.deleteMessage.bind(this);
	}
	deleteMessage(e){
		let result = confirm("确认要删除吗？")
		if(result==true){
			let msgId = e.target.dataset.msgid;
			let userId = this.state.userId;
			this.props.deleteUserMessage({userId,msgId})();
			var body = document.getElementsByTagName('body')[0]
			//body.remove(e.target.parentNode.parentNode)
		}
		else{
			return;
		}
	}
	componentWillMount(){
		this.setState({
            userId: localStorage.getItem("userId"),
            itemId:localStorage.getItem("itemId"),
        });
		let userId = this.state.userId;
		let itemId = this.state.itemId;
		//this.props.requestUserMessage({userId,itemId})();
	}
	componentDidMount(){

	}
	render(){
		const msgList = this.props.msgList.toJS();
		return (
			<div className={style.main}>
			    <div className={style.content}>
				   {msgList.map((value,index)=>(
				   		<div className={style.userMessage} key={value.msgId} style={{display:value.msgId?'flex':'none'}}>
				            <div className={style.photo}>
				                <img src={value.fromUserAvatar} alt=""/>
				            </div>
				            <div className={style.innerTxt}>
				                <div className={style.userName}>
				                    {value.fromUserId}
				                </div>
				                <div className={style.message}>
				                    {value["value"]}
				                </div>
				            </div>
				            <div className={style.other}>
				                <div className={style.dateTime}>
				                    {value["time"]}
				                </div>
				                <div data-msgId={value.msgId} style={{textAlign:'right'}} onClick={this.deleteMessage}>
				                    <img style={{width:'6vw',marginLeft:'6vw',}} data-msgId={value.msgId} src={`${imgUrl}search/clear.png`}/>
				                </div>
				            </div>
				        </div>
				    ))}
			    </div>
			</div>
		)
	}
}
export default Home;

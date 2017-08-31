import { GET_MES_INFO ,DELE_MES_INFO,GET_ERROR,DELETE_EROR}  from './actionTypes.js';
import { fromJS ,toJS } from 'immutable';
import { createAction } from 'redux-actions';
const initialState = fromJS({
    msgList:[
       { "msgId" : "234567",
        "fromUserId" : "小仙女",
        "fromUserAvatar" : "http://youshi-1253746847.cosgz.myqcloud.com/avatar2.jpeg",
        "value" : "能便宜点吗，小仙女.我看着这个口红好久了呢",
        "time" : "2017-07-09",
        "itemId" : "20"},
        {
            "msgId" : "890876",
            "fromUserId" : "铁公鸡",
            "fromUserAvatar" : "http://youshi-1253746847.cosgz.myqcloud.com/avatar3.jpg",
            "value" : "能包邮吗，优惠一点交个朋友嘛。哈哈",
            "time" : "2017-07-08",
            "itemId" : "21"
        },
        {
            "msgId" : "5678",
            "fromUserId" : "react",
            "fromUserAvatar" : "http://youshi-1253746847.cosgz.myqcloud.com/avatar.png",
            "value" : "hi，我好像跟你在一个学校，你住在哪个宿舍楼呀。",
            "time" : "2017-07-07",
            "itemId" : "21"
        }

    ]
})
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MES_INFO:
        {   
            state.set('getError','');
            state.set('deleteError','');
			return state.set('msgList', fromJS(action.payload.data.msgList));
        }
		case DELE_MES_INFO:
        {
            let msgId = action.payload.data;
            let msgList = state.get('msgList').toJS();
            for(var i=0;i<msgList.length;i++){
                if(msgList[i].msgId==msgId)
                    break;
            }
            return state.setIn(['msgList',i,'msgId'],null).set('getError','').set('deleteError','');
        }
		case GET_ERROR:
        {
            state.set('deleteError','');
			return state.set('getError',fromJS(action.payload.data));
        }
		case DELETE_EROR:
        {
            state.set('getError','');
			return state.set('deleteError',fromJS(action.payload.data));
        }
		default:
			return state;
	}
}


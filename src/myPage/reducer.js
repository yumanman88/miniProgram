import { GET_QQ_INFO ,REQEST_ERROR ,GET_USERID, GET_USERID_ERROR}  from './actionTypes';
import { fromJS ,toJS } from 'immutable';
import { createAction } from 'redux-actions';
const initialState = fromJS({
    infoData:{
        qqInfo:{
    			"img":"",
                "qqNum":"请稍等",
                "gender":"请稍等",
                "age":"请稍等",
                "constellation":"请稍等",
                "nativePlace":"请稍等",
                "point":"请稍等"
            }},
    userId:""
});
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_QQ_INFO:
			return state.set('infoData', fromJS(action.payload.data));
		case GET_USERID:
        {
			return state.set('userId',fromJS(action.payload.data));
        }
		case GET_USERID_ERROR:
			return state;
		default:
			return state;
	}
}


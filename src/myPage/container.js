import {
	connect
} from 'react-redux';
import component from './index.js';
import { requestQQInfo,getUserId } from './action.js';
import {
	toJS
} from 'immutable';
const mapStateToProps = (state) => ({
	infoData:state.getIn(['myPage','infoData']),
	userId:state.getIn(['myPage','userId'])
});
const mapDispatchToProps = (dispatch) => ({
	requestQQInfo: (userId) => () => {
		dispatch(requestQQInfo(
			userId
		));
	},
	getUserId:()=>()=>{
		dispatch(getUserId())
	}
});

export default connect(mapStateToProps,mapDispatchToProps)(component);
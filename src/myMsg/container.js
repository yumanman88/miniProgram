import {
	connect
} from 'react-redux';
import component from './index.js';
import { requestUserMessage,deleteUserMessage } from './action.js';
import { toJS } from 'immutable';
const mapStateToProps = (state) => ({
	msgList:state.getIn(['myMsg','msgList']),
	userId:state.getIn(['myMsg','userId']),
	getError:state.getIn(['myMsg','getError']),
	deleteError:state.getIn(['myMsg','deleteError'])
});
const mapDispatchToProps = (dispatch) => ({
	requestUserMessage: ({userId,itemId}) => () => {
		dispatch(requestUserMessage({
			userId,itemId
		}));
	},
	deleteUserMessage:({userId,msgId})=>()=>{
		dispatch(deleteUserMessage({
			userId,msgId
		}))
	},
});

export default connect(mapStateToProps,mapDispatchToProps)(component);
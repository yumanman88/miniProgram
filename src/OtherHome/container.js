import {
	connect
} from 'react-redux';
import component from './index.js';
import {
	requestHomeData
} from '../Home/action.js';
import{requestInfoData,requestRelevanceData}from './action.js';
import {
	toJS
} from 'immutable';

const mapStateToProps = (state) => ({
	items: state.getIn(['home', 'items']),
	info: state.getIn(['otherHome', 'info']),
	relevance: state.getIn(['otherHome', 'relevance'])
});

const mapDispatchToProps = (dispatch) => ({
	requestHomeData: (tags, userId) => () => {
		dispatch(requestHomeData({
			tags,
			userId
		}));
	},
	requestInfoData: (userId) => () => {
		dispatch(requestInfoData({
			userId
		}));
	},
	requestRelevanceData: (userId) => () => {
		dispatch(requestRelevanceData({
			userId
		}));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
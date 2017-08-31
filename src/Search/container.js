import {
	connect
} from 'react-redux';
import component from './index.js';
import {
	searchChange,
} from './action.js';
import{requestHomeData}from '../Home/action.js';
import {
	toJS
} from 'immutable';

const mapStateToProps = (state) => ({
	keyword: state.getIn(['search', 'keyword']),
	items: state.getIn(['home', 'items'])
});
const mapDispatchToProps = (dispatch) => ({
	searchChange: (value) => () => {
		dispatch(searchChange({
			value
		}))
	},
	requestHomeData: (keyword, userId) => () => {
		dispatch(requestHomeData({
			keyword,
			userId
		}));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
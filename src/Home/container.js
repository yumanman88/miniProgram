import {
	connect
} from 'react-redux';
import component from './index.js';
import {
	requestHomeData
} from './action.js';
import {
	toJS
} from 'immutable';

const mapStateToProps = (state) => ({
	items: state.getIn(['home', 'items'])
});

const mapDispatchToProps = (dispatch) => ({
	requestHomeData: (tags, userId) => () => {
		dispatch(requestHomeData({
			tags,
			userId
		}));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
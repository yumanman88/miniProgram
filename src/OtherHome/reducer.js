import {
	LOAD_INFO_DATA,
	LOAD_RELEVANCE_DATA
} from './actionTypes.js';
import {
	fromJS,
	toJS
} from 'immutable';

const initialState = fromJS({
	info:{},
	relevance:{}
});

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_INFO_DATA:
			return state.set('info', fromJS(action.payload.data));
		case LOAD_RELEVANCE_DATA:
		    return state.set('relevance',fromJS(action.payload.data));
		default:
			return state;
	}
}
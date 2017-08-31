import {
	SEARCH_CHANGE
} from './actionTypes.js';
import {
	fromJS,
	toJS
} from 'immutable';

const initialState = fromJS({
	keyword: ''
});

export default function(state = initialState, action) {
	switch (action.type) {
		case SEARCH_CHANGE:
			return state.set('keyword', action.payload.value);
		default:
			return state;
	}
}
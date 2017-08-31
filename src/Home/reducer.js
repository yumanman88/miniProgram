import {
	LOAD_HOME_DATA
} from './actionTypes.js';
import {
	fromJS,
	toJS
} from 'immutable';

const initialState = fromJS({
	items: []
});

export default function(state = initialState, action) {
	switch (action.type) {
		case LOAD_HOME_DATA:
			return state.set('items', fromJS(action.payload.data));
		default:
			return state;
	}
}
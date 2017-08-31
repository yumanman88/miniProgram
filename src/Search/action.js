import {
	SEARCH_CHANGE
} from './actionTypes.js';
import {
	createAction
} from 'redux-actions';
import {
	imgUrl
} from '../imgUrl.js';

export const searchChange = createAction(SEARCH_CHANGE);
import {
	LOAD_INFO_DATA,
	LOAD_RELEVANCE_DATA
} from './actionTypes.js';
import {
	createAction
} from 'redux-actions';
import {
	imgUrl
} from '../imgUrl.js';
import {Util} from '../common/js/util.js'; 
export const loadInfoData = createAction(LOAD_INFO_DATA);
export const loadRelevanceData = createAction(LOAD_RELEVANCE_DATA);

export const requestInfoData = (userid) => {
	return (dispatch) => {
		fetch("/api/user/qqInfo"+Util.addQuery('userId', location.href.split('?')[1].split('=')[1].split('&')[0]), {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'default'
		}).then(response => {
			return response.json()
		}).then(response => {
				(dispatch(loadInfoData({
					data: response.data.qqInfo
				})))
		})
	};
}

export const requestRelevanceData = ({userid}) => {
	return (dispatch) => {
		fetch("/api/user/relevance"+Util.addQuery('userId', 1,'relevanceId',1), {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'default'
		}).then(response => {
			return response.json()
		}).then(response => {
				(dispatch(loadRelevanceData({
					data: response.data
				})))
		})
	};
}
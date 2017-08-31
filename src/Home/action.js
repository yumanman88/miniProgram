import {
	HOME_INIT,
	LOAD_HOME_DATA,
	HOME_ERROR
} from './actionTypes.js';
import { searchSuccess } from '../Search/action.js';
import {
	createAction
} from 'redux-actions';
import {
	imgUrl
} from '../imgUrl.js';
import {
	HashRouter,
} from 'react-router-dom';
import {Util} from '../common/js/util.js';
export const homeError = createAction(HOME_ERROR);
export const loadHomeData = createAction(LOAD_HOME_DATA);

export const requestHomeData = ({ userId, tags, keyword }) => {
	return (dispatch) => {
		let data = JSON.stringify({
			tagsList: '',
			keyword: '',
			userId: 1,
			pageNum: 1
		});
		//console.log(data);
		fetch("/api/items/list"+Util.addQuery('tagsList', '[6,3,2]','userId', localStorage.getItem("userId"),'pageNum',1), {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'default'
		}).then(response => {
			return response.json()
		}).then(response => {
			(dispatch(loadHomeData({
				data: response.data.items
			})))
		})
	};
}

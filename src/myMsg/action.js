import { GET_MES_INFO, DELE_MES_INFO, GET_ERROR, DELETE_EROR } from './actionTypes.js';
import { createAction } from 'redux-actions';
import { HashRouter } from 'react-router-dom';
import createHashHistory from 'history/createBrowserHistory'
const history = createHashHistory();
export const getMessage = createAction(GET_MES_INFO);
export const deleteMessage = createAction(DELE_MES_INFO);
export const getError = createAction(GET_ERROR);
export const deleteError = createAction(DELETE_EROR);
export const requestUserMessage = ({ userId = 17, itemId = 20 }) => {
	let data = JSON.stringify({
		userId: userId ? userId : '',
		itemId: itemId ? itemId : ''
	});
	return (dispatch) => {
		fetch("/api/message/itemMsg?userId=" + userId, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'default',
			body: data
		}).then(response => {
			return response.json()
		}).then(response => {
			dispatch(getMessage({
				data: response.data
			}))
		})
	}
}
export const deleteUserMessage = ({ userId = 1, msgId = 20 }) => {
	let data = JSON.stringify({
		userId: userId ? userId : '',
		msgId: msgId ? msgId : ''
	});
	return (dispatch) => {
		dispatch(deleteMessage({data:msgId}))
	}
}

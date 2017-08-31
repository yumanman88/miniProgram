import { GET_QQ_INFO ,REQEST_ERROR , GET_USERID,GET_USERID_ERROR}  from './actionTypes.js';
import { createAction } from 'redux-actions';
import {
	HashRouter,
} from 'react-router-dom';
export const getQQInfo = createAction(GET_QQ_INFO);
export const getError = createAction(REQEST_ERROR);
export const getUser = createAction(GET_USERID);
export const getUserError = createAction(GET_USERID_ERROR);
export const getUserId = ()=>{
	let userId = localStorage.getItem("userId");
	return (dispatch) =>{
		if(userId){
			alert(userId)
			dispatch(getUser({data:userId}));
		}
		else{
			dispatch(getUserError());
		}
	}
}
export const requestQQInfo = ({userId=1})=>{
	let data = JSON.stringify({
			userId: userId ? userId : ''
		});
	return (dispatch) =>{
		fetch("/api/user/qqInfo?userId="+userId, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'default'
		}).then(response => {
			return response.json()
		}).then(response => {
				dispatch(getQQInfo({
					data: response.data
				}))    
		})
	}
}

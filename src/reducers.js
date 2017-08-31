import {
	combineReducers
} from 'redux-immutable';
import home from './Home/reducer';
import search from './Search/reducer';
import myPage from './myPage/reducer'
import myMsg from './myMsg/reducer'
import otherHome from './OtherHome/reducer';
export default combineReducers({
	home,
	search,
	myPage,
	myMsg,
	otherHome
});
import { fromJS } from 'immutable';
import * as actionType from './actionType';

const defaultState = fromJS({
	login: false
})

export default (state = defaultState, action) => {
	switch(action.type){
		case actionType.LOGIN:
			return state.set("login", action.login);
		case actionType.LOGOUT:
			return state.set("login", action.login);
		default:
			return state;
	}
}
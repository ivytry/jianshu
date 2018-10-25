import { actionTypes } from '.';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	focused: false,
	mouseIn: false,
	currentPage: 1,
	totalPage: 1,
	pageSize: 10,
	list: []
})

export default (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.FOCUS_SEARCH:
			return state.set("focused", action.focused);
		case actionTypes.BLUR_SEARCH:
			return state.set("focused", action.focused);
		case actionTypes.INIT_SEARCH_INFO_LIST:
			return state.merge({"list": action.list, "pageSize": action.pageSize, "totalPage": action.totalPage});
		case actionTypes.MOUSE_ENTER:
			return state.set("mouseIn", action.mouseIn);
		case actionTypes.MOUSE_LEAVE:
			return state.set("mouseIn", action.mouseIn);
		case actionTypes.SWITCH_PAGE:
			return state.set("currentPage", action.currentPage);
		default:
			return state;
	}
}
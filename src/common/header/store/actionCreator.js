import { actionTypes } from '.';
import { fromJS } from 'immutable';
import axios from 'axios';

const initSearchInfoList = (list, pageSize, totalPage) => ({
	type: actionTypes.INIT_SEARCH_INFO_LIST,
	list: fromJS(list),
	pageSize: pageSize,
	totalPage: totalPage
})

export const focusSearch = () => ({
	type: actionTypes.FOCUS_SEARCH,
	focused: true
})

export const blurSearch = () => ({
	type: actionTypes.BLUR_SEARCH,
	focused: false
})

export const mouseEnter = () => ({
	type: actionTypes.MOUSE_ENTER,
	mouseIn: true
})

export const mouseLeave = () => ({
	type: actionTypes.MOUSE_LEAVE,
	mouseIn: false
})

export const switchPage = (currentPage, totalPage, icon) => {
	let deg = icon.style.transform.replace(/[^0-9]/ig,"")
	if(deg){
		deg = parseInt(deg)
		deg += 360
	}else{
		deg = 360
	}
	icon.style.transform = "rotate(" + deg + "deg)";
	return{
		type: actionTypes.SWITCH_PAGE,
		currentPage: currentPage<totalPage ? currentPage+1 : 1
	}
}

export const getSearchInfoList = () => {
	return (dispatch) => {
		axios.get('/api/searchInfoList.json').then((res) => {
			const list = res.data.list;
			const pageSize = res.data.pageSize;
			const totalPage = Math.ceil(list.length / pageSize);
			dispatch(initSearchInfoList(list, pageSize, totalPage));
		}).catch((err) => {
			console.log(err)
		})
	}
}

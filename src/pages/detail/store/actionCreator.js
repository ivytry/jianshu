import axios from 'axios';
import * as actionType from './actionType';

const getDtail = (data) => {
	return {
		type: actionType.GET_DETAIL_DATA,
		title: data.title,
		content: data.content
	}
}

export const getDtailData = (id) => {
	return (dispatch) => {
		axios.get("/api/detail.json?id="+id).then((res) => {
			dispatch(getDtail(res.data.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}

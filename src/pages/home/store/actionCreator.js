import axios from 'axios';
import * as actionType from './actionType';

const getHomeData = (data) => {
	return {
		type: actionType.GET_INIT_HOMR_DATA,
		bannerList: data.bannerList,
		topicList: data.topicList,
		articleList: data.articleList,
		recommendList: data.recommendList,
		erma: data.erma,
		authorList: data.authorList
	}
}

const getMoreArticleData = (data, currentPage) => {
	return {
		type: actionType.GET_MORE_ARTICLE_DATA,
		articleList: data,
		currentPage: currentPage+1
	}
}

export const changeSlideTo = (slideTo) => {
	return{
		type: actionType.CHANGE_SLIDETO,
		slideTo: slideTo
	}
}

export const getInitHomeData = () => {
	return (dispatch) => {
		axios.get("/api/homedata.json").then((res) => {
			dispatch(getHomeData(res.data.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const getMoreArticle = (currentPage) => {
	return (dispatch) => {
		axios.get("/api/moreArticle.json?currentPage="+currentPage).then((res) => {
			dispatch(getMoreArticleData(res.data.data, currentPage))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const showBackTopBtn = (flag) => ({
	type: actionType.IS_SHOW_BACKTOPBTN,
	backTopShow: flag
})

export const switchPage = (curPage, totalPage, icon) => {
	let deg = icon.style.transform.replace(/[^0-9]/ig,"")
	if(deg){
		deg = parseInt(deg)
		deg += 360
	}else{
		deg = 360
	}
	icon.style.transform = "rotate(" + deg + "deg)";
	return{
		type: actionType.SWITCH_PAGE,
		curPage: curPage<totalPage ? curPage+1 : 1
	}
}
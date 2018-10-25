import { fromJS } from 'immutable';
import * as actionType from './actionType';

const defaultState = fromJS({
	bannerList: [],
	topicList: [],
	articleList: [],
	recommendList:[],
	erma:{},
	authorList:[],
	currentPage:1,
	backTopShow:false,
	curPage:1,
	totalPage: 1,
	pageSize: 10,
	slideTo: false
})

export default (state = defaultState, action) => {
	switch(action.type){
		case actionType.GET_INIT_HOMR_DATA:
			return state.merge({
				bannerList: fromJS(action.bannerList),
				topicList: fromJS(action.topicList),
				articleList: fromJS(action.articleList),
				recommendList: fromJS(action.recommendList),
				erma: fromJS(action.erma),
				authorList: fromJS(action.authorList)
			});
		case actionType.GET_MORE_ARTICLE_DATA:
			return state.merge({
				articleList: state.get("articleList").concat(fromJS(action.articleList)),
				currentPage: action.currentPage
			});
		case actionType.IS_SHOW_BACKTOPBTN:
			return state.set("backTopShow", action.backTopShow);
		case actionType.SWITCH_PAGE:
			return state.set("curPage", action.currentPage);
		case actionType.CHANGE_SLIDETO:
			return state.set("slideTo", action.slideTo);
		default:
			return state;
	}
}
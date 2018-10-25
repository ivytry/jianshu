import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { Link } from 'react-router-dom';
import {
	ArticleItem,
	ArticleLeft,
	ArtileTitle,
	ArticleContent,
	ArticleIconList,
	ArticleIconItem,
	AddMoreArticle
} from '../style';

class Article extends PureComponent{
	render(){
		const { list, currentPage, handleAddMoreArticle } = this.props
		return (
			<div>
				{
					list.map((item) => {
						return	(
							<Link to={"/detail/"+item.get("id")} key={item.get("id")}>
								<ArticleItem>
									<img src={item.get("imgUrl")} alt={item.get("title")}/>
									<ArticleLeft>
										<ArtileTitle>{item.get("title")}</ArtileTitle>
										<ArticleContent>{item.get("content")}</ArticleContent>
										<ArticleIconList>
											<ArticleIconItem>{item.get("author")}</ArticleIconItem>
											<ArticleIconItem>{item.get("comments")}</ArticleIconItem>
											<ArticleIconItem>{item.get("praise")}</ArticleIconItem>
										</ArticleIconList>
									</ArticleLeft>
								</ArticleItem>
							</Link>
						)
					})
				}
				<AddMoreArticle onClick={() => { handleAddMoreArticle(currentPage) }}>阅读更多</AddMoreArticle>
			</div>
		)
	}
}

const mapState = (state) => ({
	list: state.get("home").get("articleList"),
	currentPage: state.get("home").get("currentPage")
})

const mapDispatch = (dispatch) => {
	return {
		handleAddMoreArticle: (currentPage) => {
			dispatch(actionCreator.getMoreArticle(currentPage))
		}
	}
}

export default connect(mapState, mapDispatch)(Article)
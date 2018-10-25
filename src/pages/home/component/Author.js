import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { AuthorTitle, AuthorList, AuthorButton } from '../style';

class Author extends PureComponent{
	render(){
		const { handleSwitchPage, curPage, totalPage } = this.props
		return (
			<div>
				<AuthorTitle>
					<span>推荐作者</span>
					<a href="" onClick={() => {handleSwitchPage(curPage, totalPage, this.icon)}}><i ref={(e)=>{this.icon = e}} className="iconfont">&#xe790;</i>换一批</a>
				</AuthorTitle>
				<AuthorList>
					{
						this.props.list.map((item) => {
							return (
								<li key={item.get("id")}>
									<img src={item.get("imgUrl")} alt={item.get("name")} />
									<div className="name">{item.get("name")}</div>
									<div className="msg">{item.get("msg")}</div>
									<span>关注</span>
								</li>
							)
						})
					}
				</AuthorList>
				<AuthorButton>查看全部</AuthorButton>
			</div>
		)
	}
}

const mapState = (state) => ({
	list: state.get("home").get("authorList"),
	curPage: state.getIn(["home", "curPage"]),
	totalPage: state.getIn(["home", "totalPage"]),
	pageSize: state.getIn(["home", "pageSize"])
})

const mapDispatch = (dispatch) => {
	return {
		handleSwitchPage: (curPage, totalPage, icon) => {
			dispatch(actionCreator.switchPage(curPage, totalPage, icon))
		}
	}
}

export default connect(mapState, mapDispatch)(Author)
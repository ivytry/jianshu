import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreator as loginActionCreators } from '../../pages/login/store';
import { HeaderWrapper, HeaderInner, Logo, Nav, NavItem, SearchWrapper, SearchInfo, SearchTitle, SearchTitleName, SearchTitleInfo, SearchInfoList, SearchInfoItem, NavSearch, Addition, Button } from './style';

class Header extends PureComponent {
	searchInfo(){
		const { focused, list, pageSize, currentPage, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleSwitchPage } = this.props
		const JSlist = list.toJS()
		const currentList = []

		if(JSlist.length){
			for(let i=(currentPage-1)*pageSize; i<currentPage*pageSize; i++){
				currentList.push(<SearchInfoItem key={i}>{JSlist[i]}</SearchInfoItem>)
			}
		}
		
		if(focused || mouseIn){
			return (
				<SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<SearchTitle>
						<SearchTitleName>热门搜索</SearchTitleName>
						<SearchTitleInfo onClick={() => {handleSwitchPage(currentPage, totalPage, this.icon)}}>
							<i ref={(e)=>{this.icon = e}} className="iconfont">&#xe790;</i>换一批
						</SearchTitleInfo>
					</SearchTitle>
					<SearchInfoList>
						{ currentList }
					</SearchInfoList>
				</SearchInfo>
			)
		}
	}
	
	render(){
		const { login, focused, list, handleFocus, handleBlur, handleLogout } = this.props
		return (
			<HeaderWrapper>
				<HeaderInner>
					<Link to="/">
						<Logo />
					</Link>
					<Nav>
						<NavItem className="left active"><a href="/">首页</a></NavItem>
						<NavItem className="left">下载App</NavItem>
						{login ? <NavItem className="right" onClick={handleLogout}>退出</NavItem> : <Link to="/login"><NavItem className="right">登录</NavItem></Link>}
						<NavItem className="right">
							<i className="iconfont">&#xe636;</i>
						</NavItem>
						<SearchWrapper>
							<CSSTransition 
								in={focused} 
								timeout={200} 
								classNames="slide" 
							>
								<NavSearch 
									onFocus={()=>{handleFocus(list)}} 
									onBlur={handleBlur}
								></NavSearch>
							</CSSTransition>
							<i className={focused ? "iconfont focused" : "iconfont"}>&#xe623;</i>
							{ this.searchInfo(focused) }
						</SearchWrapper>
						<Addition>
							<Button className="reg">注册</Button>
							<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
						</Addition>
					</Nav>
				</HeaderInner>
			</HeaderWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	login: state.getIn(["login", "login"]),
	focused: state.getIn(["header", "focused"]),
	list: state.getIn(["header", "list"]),
	mouseIn: state.getIn(["header", "mouseIn"]),
	currentPage: state.getIn(["header", "currentPage"]),
	totalPage: state.getIn(["header", "totalPage"]),
	pageSize: state.getIn(["header", "pageSize"])
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleFocus: (list) => {
			(list.size === 0) && dispatch(actionCreators.getSearchInfoList())
			dispatch(actionCreators.focusSearch())
		},
		handleBlur: () => {
			dispatch(actionCreators.blurSearch())
		},
		handleMouseEnter: () => {
			dispatch(actionCreators.mouseEnter())
		},
		handleMouseLeave: () => {
			dispatch(actionCreators.mouseLeave())
		},
		handleSwitchPage: (currentPage, totalPage, icon) => {
			dispatch(actionCreators.switchPage(currentPage, totalPage, icon))
		},
		handleLogout: () => {
			dispatch(loginActionCreators.logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
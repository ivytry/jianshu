import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Banner from './component/Banner';
import Topic from './component/Topic';
import Article from './component/Article';
import Recommend from './component/Recommend';
import Erma from './component/Erma';
import Author from './component/Author';
import { HomeWrapper, HomeLeft, HomeRight, BackTop, HomeFoot }from './style';

class Home extends PureComponent{
	render(){
		return (
			<HomeWrapper>
				<HomeLeft>
					<Banner />
					<Topic />
					<Article />
				</HomeLeft>
				<HomeRight>
					<Recommend />
					<Erma />
					<Author />
				</HomeRight>
				<HomeFoot>
					<div className="main">
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/c/jppzD2">关于简书</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/contact">联系我们</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/c/bfeec2e13990">加入我们</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/p/fc1c113e5b6b">简书出版</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/press">品牌与徽标</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/faqs">帮助中心</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/p/cabc8fa39830">合作伙伴</a>      
						<div className="icp">
							<div>
						        ©2012-2018 上海佰集信息科技有限公司 / 简书 / 沪ICP备11018329号-5 / 
						        <a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402002252">
						          <img src="//cdn2.jianshu.io/assets/web/smrz-557fa318122c99a66523209bf9753a27.png" alt="Smrz" />
								</a>      
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402002252">沪公网安备31010402002252号 / </a>
						        <a target="_blank" rel="noopener noreferrer" href="http://www.shjbzx.cn/">
						          <img src="//cdn2.jianshu.io/assets/web/wxb-a216456895eb66c17497dbd3da443cf8.png" alt="Wxb" />
								</a>  
								举报电话：021-34770013 / 
						        <a target="_blank" rel="noopener noreferrer" href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&amp;serial=9031000020171107081457000002158769-SAIC_SHOW_310000-20171115131223587837&amp;signData=MEQCIADWZ5aTcBeER5SOVp0ly+ElvKnwtjczum6Gi6wZ7/wWAiB9MAPM22hp947ZaBobux5PDkd0lfqoCOkVV7zjCYME6g==">
						          <img src="//cdn2.jianshu.io/assets/web/zggsrz-5695587dccf490ca3e651f4228f7479e.png" alt="Zggsrz" />
								</a>    
							</div>   
						</div>
					</div>
				</HomeFoot>
				{this.props.backTopShow ? <BackTop onClick={this.backTop}><i className="iconfont">&#xe657;</i></BackTop> : null}
			</HomeWrapper>
		)
	}

	backTop(){
		window.scrollTo(0, 0)
	}

	componentDidMount(){
		this.props.handleGetInitData()
		this.addEvents()
	}
	
	addEvents(){
		window.addEventListener("scroll", this.props.handleBackTop)
	}
}

const mapState = (state) => ({
	backTopShow: state.get("home").get("backTopShow")
})

const mapDispatch = (dispatch) => {
	return {
		handleGetInitData: () => {
			dispatch(actionCreator.getInitHomeData())
		},
		handleBackTop: (e) => {
			dispatch(actionCreator.showBackTopBtn((document.body.scrollTop > 400) ? true : false))
		}
	}
}

export default connect(mapState, mapDispatch)(Home)
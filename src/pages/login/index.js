import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginWrapper, LoginBox } from './style';
import { connect } from 'react-redux';
import { actionCreator } from './store';

class Login extends PureComponent{
	render(){
		if(!this.props.login) {
			return (
				<LoginWrapper>
					<LoginBox>
						<h4>
							<div>
								<a className="active" href="/login">登录</a>
								<b> · </b>
								<a href="/logup">注册</a>
							</div>
						</h4>
						<div>
							<form action="/sessions">
								<div className="restyle">
									<input className="ic-user" type="text" placeholder="手机号或邮箱" ref={(input) => {this.account = input}} />
									<i class="iconfont">&#xe624;</i>
								</div>
								<div className="restyle">
									<input className="ic-password" type="password" placeholder="密码" ref={(input) => {this.password = input}} />
									<i class="iconfont">&#xe61b;</i>
								</div>
								<div className="remember-btn">
									<input type="checkbox" value="true" checked />
									<span>记住我</span>
								</div>
								<div className="forget-btn">
									<a href data-toggle="dropdown">登录遇到问题?</a>
									<ul className="dropdown-menu">
								        <li><a href="/users/password/mobile_reset">用手机号重置密码</a></li>
								        <li><a href="/users/password/email_reset">用邮箱重置密码</a></li>
								        <li><a target="_blank" href="/p/9058d0b8711d">无法用海外手机号登录</a></li>
								        <li><a target="_blank" href="/p/498a9fa7da08">无法用 Google 帐号登录</a></li>
								    </ul>
								</div>
								<button onClick={() => {this.props.handleLogin(this.account.value, this.password.value)}}>登陆</button>
							</form>
							<div className="more-sign">
								<h6>社交帐号登录</h6>
								<ul>
								    <li><a className="weibo" href=""><i className="iconfont ic-weibo">&#xe62f;</i></a></li>
								    <li><a className="weixin" target="_blank" href="/users/auth/wechat"><i className="iconfont ic-wechat">&#xe63e;</i></a></li>
								    <li><a id="qq" className="qq" target="_blank" href="/users/auth/qq_connect"><i className="iconfont ic-qq_connect">&#xe6d8;</i></a></li>
								    <li className="js-hide-method"><a className="douban" target="_blank" href="/users/auth/douban"><i className="iconfont ic-douban">&#xe64d;</i></a></li>
								</ul>
							</div>
						</div>
					</LoginBox>
				</LoginWrapper>
			)
		}else{
			return <Redirect to="/" />
		}
	}
}

const mapState = (state) => ({
	login: state.get("login").get("login")
})

const mapDispatch = (dispatch) => ({
	handleLogin: (account, password) => {
		dispatch(actionCreator.logIn(account, password))
	}
})

export default connect(mapState, mapDispatch)(Login)
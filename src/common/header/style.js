import styled from 'styled-components';
import LogoPic from '../../statics/nav-logo.png';

export const HeaderWrapper = styled.div`
	height: 56px;
	border-bottom: 1px solid #f0f0f0;
	margin-bottom:30px;
`;

export const HeaderInner = styled.div`
	min-width: 768px;
    max-width: 1440px;
    margin: 0 auto;
    position:relative;
`;

export const Logo = styled.div`
	width:100px;
	height:56px;
	background:url(${LogoPic});
	background-size:contain;
	float:left;
`;

export const Nav = styled.div`
    margin:0 auto;
    padding:0 15px;
    height: 56px;
	width: 960px;
`;

export const NavItem = styled.div`
	line-height:26px;
	padding:15px;
	cursor: pointer;
	a{
		text-decoration:none;
	}
	&.left{
		float:left;
		margin-right:10px;
		color:#333
		font-size:17px
		:hover{
			background-color:#f2f2f2;
		}
	}
	&.right{
		float:right;
		margin-left:10px;
		color:#969696;
		font-size:15px;
	}
	&.active{
		a{
			color: #ea6f5a;
		}
		:hover{
			background-color: transparent;
		}
	}
`;

export const SearchWrapper = styled.div`
	position:relative;
	float:left;
	padding:9px;
	.iconfont{
		position:absolute;
		top:5px;
		right:5px;
		text-align:center;
		width:30px;
		height30px;
		line-height:30px
		margin:8px 18px 0 0;
		border-radius:19px;
		&.focused{
			background:#969696!important;
			color:white;
		}
	}
`;

export const SearchInfo = styled.div`
	position:absolute;
	top:56px;
	left:19px;
	box-shadow: 0 0 8px rgba(0,0,0,.2);
	background-color: #fff;
	margin-top: 9px;
	width: 250px;
	border-radius: 4px;
	padding: 20px 20px 10px;
	z-index:9999;
`;

export const SearchTitle = styled.div`
	height: 20px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #969696;
`;

export const SearchTitleName = styled.span`
    float: left;
`;

export const SearchTitleInfo = styled.a`
	float: right;
    font-size: 13px;
    color: #969696;
    background-color: transparent;
    border-width: 0;
    padding: 0;
    .iconfont{
    	right:35px;
    	transition: all .2s ease-in;
    	transform-origin: center center;
    }
`;

export const SearchInfoList = styled.ul`
	font-size: 0;
`;

export const SearchInfoItem = styled.a`
	margin: 0 5px 10px;
    display: inline-block;
    padding: 3px 6px;
    font-size: 12px;
    color: #787878;
    border: 1px solid #ddd;
    border-radius: 3px;
`;

export const NavSearch = styled.input.attrs({
	placeholder:'搜索'
})`
	width:240px;
	height:38px;
	float:left;
	line-height:38px;
	padding:0 35px 0 15px;
	margin:0 10px;
	box-sizing:border-box;
	border:1px solid #eee;
	border-radius:19px;
	font-size:14px;
	background: #eee;
	&::placeholder{
		color:#999;
	}
	&.focused{
		width:320px;
	}
	&.slide-enter{
		transition:all .2s ease-out
	}
	&.slide-enter-active{
		width:320px;
	}
	&.slide-enter-done{
		width:320px;
	}
	&.slide-entered{
		width:320px;
	}
	&.slide-exit{
		transition:all .2s ease-out
	}
	&.slide-exit-active{
		width:240px;
	}
	&.slide-exit-done{
		width:240px;
	}
`;

export const Addition = styled.div`
	position:absolute;
	top:0;
	right:0;
`;

export const Button = styled.button`
	border:1px solid #ea6f5a;
	border-radius:19px;
	height:38px;
	line-height:38px;
	margin:9px 0 0 20px;
	padding:0 20px;
	font-size:15px;
	&.reg{
		color:#ea6f5a;
		background-color: transparent;
		:hover{
			background-color: #fff7f6;
			border:1px solid #ea6e59;
		}
	}
	&.writing{
		color:#fff;
		background-color: #ea6f5a;
		:hover{
			background-color: #ea604c;
		}
	}
`;

export const yt = styled.div`

`;

export const tr = styled.div`

`;
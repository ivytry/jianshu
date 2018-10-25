import styled from 'styled-components';

export const HomeWrapper = styled.div`
	width: 960px;
	margin: 0 auto;
	overflow: hidden;
`;

export const HomeLeft = styled.div`
	width:640px;
	float:left;
	.ant-carousel{
		.slick-slider{
			border-radius:6px;
			overflow:hidden;
			height:270px;
		}
		.slick-slide{
			img{
				width:640px;
			}
		}
	}
	.carousel{
		position:relative;
	}
	.goto{
		z-index: 1000;
		position: absolute;
		top: 110px;
		height: 50px;
    	width: 40px;
    	background-color: ${props => props.slideTo ? "rgba(0,0,0,.4)" : "rgba(0,0,0)"};
    	line-height:50px;
    	&.prev{
    		border-top-right-radius: 6px;
    		border-bottom-right-radius: 6px;
			left: 0;
    	}
    	&.next{
    		border-top-left-radius: 6px;
    		border-bottom-left-radius: 6px;
			right: 0;
    	}
    	i{
			color:${props => props.slideTo ? "white" : "rgba(0,0,0)"};
    	}
	}
`;

export const HomeRight = styled.div`
	width:280px;
	float:left;
	margin:-4px 0 0 30px;
	.recommendImg{
		width: 100%;
	    min-height: 50px;
	    margin-bottom: 6px;
	    border-radius: 4px;
	}
`;

//Topic

export const TopicWrapper = styled.div`
	margin:34px 0 16px -18px;
	overflow:hidden;
	border-bottom: 1px solid #f0f0f0;
	padding-bottom:20px;
`;

export const TopicItem = styled.div`
	padding-right:10px;
	float:left;
	height:32px;
	line-height:32px;
	margin: 0 0 18px 18px;
    background-color: #f7f7f7;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    font-size:14px;
    cursor:pointer;
	.img{
    	display:block;
    	float:left;
		width:32px;
		height:32px;
		margin-right: 10px;
	}
	&.more{
    	background-color: white;
    	border: 0;
    	color: #787878;
	}
`;

//Article

export const ArticleItem = styled.div`
	min-height:140px;
    margin-bottom: 15px;
    padding: 15px 2px 0 0;
    border-bottom: 1px solid #f0f0f0;
    word-wrap: break-word;
    overflow:hidden;
    img{
    	float:right;
    	width:125px;
    }
`;

export const ArticleLeft = styled.div`
	width:483px;
	float:left;
`;

export const ArtileTitle = styled.h3`
	margin: -7px 0 4px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
`;

export const ArticleContent = styled.p`
	margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
`;

export const ArticleIconList = styled.div`
	padding-right: 0!important;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
`;

export const ArticleIconItem = styled.span`
	margin-right: 10px;
    color: #b4b4b4;
`;

export const AddMoreArticle = styled.div`
    border-radius: 20px;
    background-color: #a5a5a5;
    height: 20px;
    line-height: 20px;
    margin: 30px auto 60px;
    padding: 10px 15px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
    :hover{
		background-color: #9a9a9a;
    }
`;
	
//Erma

export const ErmaWrapper = styled.div`
	margin-bottom: 30px;
    padding: 10px 22px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background-color: #fff;
    overflow:hidden;
    img{
    	width: 60px;
	    height: 60px;
	    opacity: .85;
	    vertical-align: middle;
    }
    .right{
    	display: inline-block;
	    vertical-align: middle;
	    margin-left: 12px;
    }
    .title{
    	font-size: 15px;
    	color: #333;
    }
    p{
    	margin-top: 8px;
	    font-size: 13px;
	    color: #999;
    }
`;

// AuthorList

export const AuthorTitle = styled.div`
	span{
		font-size: 14px;
    	color: #969696;
	}
	a{
		float: right;
	    display: inline-block;
	    font-size: 14px;
	    color: #969696;
	    text-decoration: none;
	}
`;

export const AuthorList = styled.ul`
	overflow:hidden;
	li{
		margin-top: 15px;
		line-height: 20px;
		position:relative;
		img{
			float: left;
		    width: 48px;
		    height: 48px;
		    margin-right: 10px;
		}
		.name{
			padding-top: 5px;
		    margin-right: 60px;
		    font-size: 14px;
		    display: block;
		}
		.msg{
			margin-top: 2px;
		    font-size: 12px;
		    color: #969696;
		}
		span{
			position:absolute;
		    top:5px;
		    right:0;
		    padding: 0;
		    font-size: 13px;
		    color: #42c02e;
		    border-color: #42c02e;
		    font-weight: 400;
    		line-height: normal;
		}
	}
`;

export const AuthorButton = styled.div`
    padding: 7px 7px 7px 12px;
    font-size: 13px;
    color: #787878;
    background-color: #f7f7f7;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    margin-top: 20px;
    text-align:center;
`;

// BackTop

export const BackTop = styled.a`
	cursor: pointer;
    width: 50px;
    height: 50px;
    text-align: center;
    display: block;
    position: fixed;
    bottom: 40px;
    right: 40px;
    line-height:50px;
    font-size:12px;
    z-index: 1040;
    border: 1px solid #dcdcdc;
    background-color: #fff;
    transition: .1s ease-in;
    i{
    	font-weight:bold;
    }
`;

export const HomeFoot = styled.div`
	.main{
		padding-right: 0;
    	font-size: 13px;
    	color: #969696;
    	padding-top: 25px;
    	display: block;
    	clear:both;
    	margin-bottom: 20px;
		a{
			color: #969696;
	    	display: inline-block;
	    	text-decoration:none;
		}
		.icp{
			color: #c8c8c8;
			margin-top: 10px;
    		font-size: 12px;
    		a{
    			color: #c8c8c8;
    		}
    		img{
    			height: 30px;
    		}
		}
	}
`;